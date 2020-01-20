package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entities.Person;
import DTO.PersonsDTO;
import exceptions.PersonNotFoundException;
import utils.EMF_Creator;
import facades.PersonFacade;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

//Todo Remove or change relevant parts before ACTUAL use
@Path("person")
public class PersonResource {

    private static final EntityManagerFactory EMF = EMF_Creator.createEntityManagerFactory(
            "pu",
            "jdbc:mysql://localhost:3307/startcode",
            "dev",
            "ax2",
            EMF_Creator.Strategy.CREATE);
    private static final PersonFacade FACADE = PersonFacade.getFacadeExample(EMF);
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String demo() {
        return "{\"msg\":\"Hello World\"}";
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON})
    public String addPerson(String json) {
        Person person = GSON.fromJson(json, Person.class);
        return GSON.toJson(FACADE.addPerson(person));
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON})
    public String deletePerson(@PathParam("id") int id) throws PersonNotFoundException {
        return GSON.toJson(FACADE.deletePerson(id));
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON})
    public String editPerson(@PathParam("id") int id, String json) {
        Person person = GSON.fromJson(json, Person.class);
        person.setId(id);
        return GSON.toJson(FACADE.editPerson(person));
    }

    @Path("/{id}")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String getPerson(@PathParam("id") int id) throws PersonNotFoundException {
        return GSON.toJson(FACADE.getPerson(id));
    }

    @Path("all")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String getAllPersons() {
        return GSON.toJson(new PersonsDTO(FACADE.getAllPersons()));
    }

    @Path("count")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String getPersonCount() {
        long count = FACADE.getPersonCount();
        //System.out.println("--------------->"+count);
        return "{\"count\":" + count + "}";  //Done manually so no need for a DTO
    }

}