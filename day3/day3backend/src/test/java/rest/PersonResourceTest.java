package rest;

import entities.Address;
import entities.Person;
import DTO.PersonDTO;
import utils.EMF_Creator;
import io.restassured.RestAssured;
import static io.restassured.RestAssured.given;
import io.restassured.http.ContentType;
import io.restassured.parsing.Parser;
import java.net.URI;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.core.UriBuilder;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.util.HttpStatus;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import org.junit.jupiter.api.AfterAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import utils.EMF_Creator.DbSelector;
import utils.EMF_Creator.Strategy;

//Uncomment the line below, to temporarily disable this test
//@Disabled
public class PersonResourceTest {

    private static final int SERVER_PORT = 7777;
    private static final String SERVER_URL = "http://localhost/api";
    //Read this line from a settings-file  since used several places
    private static final String TEST_DB = "jdbc:mysql://localhost:3307/startcode_test";

    static final URI BASE_URI = UriBuilder.fromUri(SERVER_URL).port(SERVER_PORT).build();
    private static HttpServer httpServer;
    private static EntityManagerFactory emf;
    Person p1 = new Person("Some txt", "More text", "", new Address("", "", ""));

    static HttpServer startServer() {
        ResourceConfig rc = ResourceConfig.forApplication(new ApplicationConfig());
        return GrizzlyHttpServerFactory.createHttpServer(BASE_URI, rc);
    }

    @BeforeAll
    public static void setUpClass() {
        emf = EMF_Creator.createEntityManagerFactory(DbSelector.TEST, Strategy.CREATE);

        //NOT Required if you use the version of EMF_Creator.createEntityManagerFactory used above        
        //System.setProperty("IS_TEST", TEST_DB);
        //We are using the database on the virtual Vagrant image, so username password are the same for all dev-databases
        httpServer = startServer();

        //Setup RestAssured
        RestAssured.baseURI = SERVER_URL;
        RestAssured.port = SERVER_PORT;

        RestAssured.defaultParser = Parser.JSON;
    }

    @AfterAll
    public static void closeTestServer() {
        //System.in.read();
        httpServer.shutdownNow();
    }

    // Setup the DataBase (used by the test-server and this test) in a known state BEFORE EACH TEST
    //TODO -- Make sure to change the script below to use YOUR OWN entity class
    @BeforeEach
    public void setUp() {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.createNamedQuery("Person.deleteAllRows").executeUpdate();
            em.persist(p1);
            em.flush();
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    @Test
    public void testServerIsUp() {
        System.out.println("Testing is server UP");
        given().when().get("/person").then().statusCode(200);
    }

    //This test assumes the database contains two rows
    @Test
    public void testDummyMsg() throws Exception {
        given()
                .contentType("application/json")
                .get("/person/").then()
                .assertThat()
                .statusCode(HttpStatus.OK_200.getStatusCode())
                .body("msg", equalTo("Hello World"));
    }

    @Test
    public void testCount() throws Exception {
        given()
                .contentType("application/json")
                .get("/person/count").then()
                .assertThat()
                .statusCode(HttpStatus.OK_200.getStatusCode())
                .body("count", equalTo(1));
    }

    @Test
    public void testAll() throws Exception {
        List<PersonDTO> personDtos;
        personDtos = given()
                .contentType(ContentType.JSON)
                .when()
                .get("/person/all")
                .then()
                .extract().body().jsonPath().getList("all", PersonDTO.class);
        PersonDTO pDTO = new PersonDTO(p1);
        assertThat(personDtos, containsInAnyOrder(pDTO));
    }

    @Test
    public void testAdd() throws Exception {
        given()
                .contentType(ContentType.JSON)
                .body(new Person("Some txt", "More text", "", new Address("", "", "")))
                .post("person")
                .then()
                .body("firstName", equalTo("Some txt"))
                .body("lastName", equalTo("More text"))
                .body("phone", equalTo(""))
                .body("id", notNullValue());
    }

    @Test
    public void testDelete() throws Exception {
        given()
                .contentType(ContentType.JSON)
                .delete("/person/" + p1.getId())
                .then()
                .body("id", equalTo(p1.getId()))
                .body("firstName", equalTo("Some txt"))
                .body("phone", equalTo(""))
                .body("id", notNullValue());
    }

    @Test
    public void testPut() throws Exception {
        given()
                .contentType(ContentType.JSON)
                .body(new Person("Some other txt", "More text", "", new Address("", "", "")))
                .put("/person/" + p1.getId())
                .then()
                .body("firstName", equalTo("Some other txt"))
                .body("phone", equalTo(""))
                .body("id", notNullValue());
    }

    @Test
    public void testGetFail() throws Exception {
        String ex = given()
                .contentType(ContentType.JSON)
                .get("/person/" + 666)
                .then()
                .extract().body().jsonPath().get().toString();
        assertEquals(ex, "{code=404, message=No person with provided id found}");
    }
}