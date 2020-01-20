package facades;

import entities.Person;
import DTO.PersonDTO;
import exceptions.PersonNotFoundException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

/**
 *
 * Rename Class to a relevant name Add add relevant facade methods
 */
public class PersonFacade implements IPersonFacade {

    private static PersonFacade instance;
    private static EntityManagerFactory emf;

    //Private Constructor to ensure Singleton
    private PersonFacade() {
    }

    /**
     *
     * @param _emf
     * @return an instance of this facade class.
     */
    public static PersonFacade getFacadeExample(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new PersonFacade();
        }
        return instance;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    //TODO Remove/Change this before use
    public long getPersonCount() {
        EntityManager em = emf.createEntityManager();
        try {
            long personCount = (long) em.createQuery("SELECT COUNT(p) FROM Person p").getSingleResult();
            return personCount;
        } finally {
            em.close();
        }

    }

    @Override
    public Person addPerson(Person p) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(p);
            em.flush();
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return p;
    }

    @Override
    public Person deletePerson(int id) throws PersonNotFoundException {
        EntityManager em = emf.createEntityManager();
        Person person;
        TypedQuery<Person> query;
        try {
            em.getTransaction().begin();
            person = em.find(Person.class, id);
            if(person == null) {
                throw new PersonNotFoundException("Could not delete, provided id does not exist");
            }
            em.remove(person);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return person;
    }

    @Override
    public PersonDTO getPerson(int id) throws PersonNotFoundException {
        EntityManager em = emf.createEntityManager();
        try {
            return new PersonDTO(em.find(Person.class, id));
        } catch(NullPointerException e) {
            throw new PersonNotFoundException("No person with provided id found");
        }finally {
            em.close();
        }
    }

    @Override
    public List<Person> getAllPersons() {
        EntityManager em = emf.createEntityManager();
        try {
            return em.createQuery("SELECT p FROM Person p", Person.class).getResultList();
        } finally {
            em.close();
        }
    }

    @Override
    public Person editPerson(Person p) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(p);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return p;
    }

}