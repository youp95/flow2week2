/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DTO;

import entities.Person;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Younes
 */
public class PersonsDTO {
    
    List<PersonDTO> all = new ArrayList();

    public PersonsDTO(List<Person> personEntities) {
        for(Person p : personEntities) {
            all.add(new PersonDTO(p));
        }
    }
}