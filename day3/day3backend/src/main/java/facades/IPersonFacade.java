/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import DTO.PersonDTO;
import entities.Person;
import exceptions.PersonNotFoundException;
import java.util.List;

/**
 *
 * @author Younes
 */
public interface IPersonFacade {

    public Person addPerson(Person p);

    public Person deletePerson(int id) throws PersonNotFoundException;

    public PersonDTO getPerson(int id) throws PersonNotFoundException;

    public List<Person> getAllPersons();

    public Person editPerson(Person p) throws PersonNotFoundException;

}