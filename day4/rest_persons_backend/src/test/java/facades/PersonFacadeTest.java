//package facades;
//
//import utils.EMF_Creator;
//import entities.Person;
//import javax.persistence.EntityManager;
//import javax.persistence.EntityManagerFactory;
//import org.junit.jupiter.api.AfterAll;
//import org.junit.jupiter.api.AfterEach;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import utils.Settings;
//import utils.EMF_Creator.DbSelector;
//import utils.EMF_Creator.Strategy;
//
////Uncomment the line below, to temporarily disable this test
////@Disabled
//public class PersonFacadeTest {
//
//    private static EntityManagerFactory emf;
//    private static PersonFacade facade;
//
//    public PersonFacadeTest() {
//    }
//
//    @BeforeAll
//    public static void setUpClass() {
//       emf = EMF_Creator.createEntityManagerFactory(DbSelector.TEST,Strategy.DROP_AND_CREATE);
//       facade = PersonFacade.getFacadeExample(emf);
//    }
//
//    @AfterAll
//    public static void tearDownClass() {
////        Clean up database after test is done or use a persistence unit with drop-and-create to start up clean on every test
//    }
//
//    // Setup the DataBase in a known state BEFORE EACH TEST
//    //TODO -- Make sure to change the script below to use YOUR OWN entity class
//    @BeforeEach
//    public void setUp() {
//        EntityManager em = emf.createEntityManager();
//        try {
//            em.getTransaction().begin();
//            em.createNamedQuery("Person.deleteAllRows").executeUpdate();
////            em.persist(new Person("Some txt", "More text"));
////            em.persist(new Person("aaa", "bbb"));
//
//            em.getTransaction().commit();
//        } finally {
//            em.close();
//        }
//    }
//
//    @AfterEach
//    public void tearDown() {
////        Remove any data after each test was run
//    }
//
//    // TODO: Delete or change this method 
//    @Test
//    public void testAFacadeMethod() {
//        assertEquals(2, facade.getPersonCount(), "Expects one rows in the database");
//    }
//
//}