
class Persona
{
    #id;
    #nombre;
    #apellido;
    #fechaNacimiento;

   constructor(id,nombre,apellido,fechaNacimiento){
    this.#id=id;
    this.#nombre=nombre;
    this.#apellido=apellido;
    this.#fechaNacimiento=fechaNacimiento;



}


}
class Ciudadano extends Persona
{
    #dni;
    
    
constructor(dni,id,nombre,apellido,fechaNacimiento)
{
    this.#dni=dni;
    super(id,nombre,apellido,fechaNacimiento)//super se usa para llamar al constructor de la clase padre dentro de una subclase para inicializar las propiedades
}


}
class Extranjero extends Persona{

    #paisOrigen;

    constructor(paisOrigen,id,nombre,apellido,edad){
        this.#paisOrigen=paisOrigen;
    
        super(id,nombre,apellido,edad);
    }

}


 // revisar porque habia timing issue que el script se cargaba antes de que el DOM estuviera loaded
 function MostrarTabla(lista) {

    lista.forEach(personas=>{// empiezo por la primera persona, crea tr en el html, hace td por id luego por nombre de izquierda a derecha hasta que termina el loop y empieza denuevo, luego crea otro row abajo y continua asi.
                
        const tabla=document.getElementById("data-output");
        
        
        const fila=document.createElement("tr");
        fila.id="fila-read";
        
        const tdID=document.createElement("td");
        tdID.id="columna-id";
        tdID.style.display="block";
        tdID.textContent=personas.id;
        fila.appendChild(tdID);

        const tdNombre=document.createElement("td");
        tdNombre.id="columna-nombre";
        tdNombre.textContent=personas.nombre;
        fila.appendChild(tdNombre);
        
        const tdApellido=document.createElement("td");
        tdApellido.id="columna-apellido";
        tdApellido.textContent=personas.apellido;
        fila.appendChild(tdApellido);
        
        const tdFechadeNacimiento=document.createElement("td");
        tdFechadeNacimiento.id="columna-edad";
        tdFechadeNacimiento.textContent=formatFechaNacimiento((personas.fechaNacimiento).toString());
        fila.appendChild(tdFechadeNacimiento);
        
        const tdDNI=document.createElement("td");
        tdDNI.id="columna-sueldo";
        tdDNI.textContent=personas.dni || "" ;
        fila.appendChild(tdDNI);
        
        const tdPaisdeOrigen=document.createElement("td");
        tdPaisdeOrigen.id="columna-ventas";
        tdPaisdeOrigen.textContent=personas.paisOrigen || "";
        fila.appendChild(tdPaisdeOrigen);

        const tdModificar=document.createElement("td");
        tdModificar.innerHTML = '<button class="modificar-btn" data-id="Modificar">Modificar</button>' ;
        fila.appendChild(tdModificar);
        
        const tdEliminar=document.createElement("td");
        tdEliminar.innerHTML = '<button class="eliminar-btn" data-id="Eliminar">Eliminar</button>' ;
        fila.appendChild(tdEliminar);
        
    

        tabla.appendChild(fila);//cuanto termina de agregar los td en la misma tr(row) carga toooda la fila para asi ir abajo por la segunda fila
        
        tdModificar.addEventListener("click",function(){
            
            
            document.getElementById("ABMID").value=tdID.textContent;
            document.getElementById("ABMNombre").value=tdNombre.textContent;
            document.getElementById("ABMApellido").value=tdApellido.textContent;
            document.getElementById("ABMFechadeNacimiento").value=fechaNacimientoABM(tdFechadeNacimiento.textContent);
            document.getElementById("ABMDNI").value=tdDNI.textContent;
            document.getElementById("ABMPaisdeOrigen").value=tdPaisdeOrigen.textContent;
     
            
            
            valorFiltro.disabled = true;

           
            if(tdDNI.textContent>0){
                
                valorFiltro.value='Ciudadano';
                AtributosCiudadanos.style.display='block';
                AtributosExtranjeros.style.display='none';
            }
            else{
                valorFiltro.value='Extranjero';
                AtributosExtranjeros.style.display='block';
                AtributosCiudadanos.style.display='none';  
            }
        
            irFormABM();
            botonAceptar('modificar');
        
        
        })
    
        tdEliminar.addEventListener("click",function(){
            document.getElementById("ABMID").value=tdID.textContent;
            document.getElementById("ABMNombre").value=tdNombre.textContent;
            document.getElementById("ABMApellido").value=tdApellido.textContent;
            document.getElementById("ABMFechadeNacimiento").value=fechaNacimientoABM(tdFechadeNacimiento.textContent);
            document.getElementById("ABMDNI").value=tdDNI.textContent;
            document.getElementById("ABMPaisdeOrigen").value=tdPaisdeOrigen.textContent;
     
            
            
            valorFiltro.disabled = true;

           
            if(tdDNI.textContent>0){
                
                valorFiltro.value='Ciudadano';
                AtributosCiudadanos.style.display='block';
                AtributosExtranjeros.style.display='none';
            }
            else{
                valorFiltro.value='Extranjero';
                AtributosExtranjeros.style.display='block';
                AtributosCiudadanos.style.display='none';  
            }
            
            
            irFormABM();
            botonAceptar('eliminar');
            
        })
    
})
 
}       
            

function formatFechaNacimiento(fechaNacimiento) {
    
    const año = fechaNacimiento.substring(0, 4);
    const mes = fechaNacimiento.substring(4, 6);
    const dia = fechaNacimiento.substring(6, 8);

    
    const formattedDate = `${dia}/${mes}/${año}`;

    return formattedDate;
}
function fechaNacimientoABM(fechaNacimiento) {
    const [dia, mes, año] = fechaNacimiento.split('/');

    const formattedDate = `${año}${mes.padStart(2, '0')}${dia.padStart(2, '0')}`;

    return formattedDate;
}
function irFormABM(){
    form1.style.display='none';
    form2.style.display='block';
    

}

function EsconderInputEC(){
    
    AtributosCiudadanos.style.display='none';
    AtributosExtranjeros.style.display='none';


}
function VaciarTabla(){

    let ta;
    ta=document.getElementById("data-output");
    ta.innerHTML='';

}


function FiltradoFormDatos() {
    const menuSeleccionado = document.querySelector('select');
    menuSeleccionado.addEventListener('change', function() {
        
        
        const xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'P.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            
            if (xhr.status == 200) {
                if (menuSeleccionado.value === 'Todos') {
                    VaciarTabla();
                    VaciarCalcularEdad();
                    MostrarTabla(personasArray); 
                    CalcularEdad(personasArray); 
                } else if (menuSeleccionado.value === 'Ciudadanos') {
                    VaciarTabla();
                    VaciarCalcularEdad();
                    MostrarTabla(listadeCiudadano); 
                    CalcularEdad(listadeCiudadano);
                } else if (menuSeleccionado.value === 'Extranjeros') {
                    VaciarTabla();
                    VaciarCalcularEdad();
                    MostrarTabla(listadeExtranjero);
                    CalcularEdad(listadeExtranjero);
                }
                console.log("Perfecto");
            } else if (xhr.status == 404) {
                console.log("File not found");
            }
        };

        xhr.send();
    });
}

function botonAgregar(){
   
    const Agregar = document.getElementById("Agregar");
    Agregar.addEventListener("click",function(){
        
        valorFiltro.disabled = false;
        valorFiltro.value='-';
        
       irFormABM();
       botonAceptar('agregar');
    });


}
function modificarUsuario(abmID) {
    if (/\d/.test(document.getElementById("ABMNombre").value) || /\d/.test(document.getElementById("ABMApellido").value) || /\d/.test(document.getElementById("ABMPaisdeOrigen").value)) {
      alert("Uno o más campos poseen números, por favor rellene el campo nuevamente");
      return;
    }
  
    alert("Desea modificar atributos de la persona?");
  
    const personIndex = personasArray.findIndex(person => person.id === abmID);
    if (personIndex !== -1) {
      personasArray[personIndex].nombre = document.getElementById("ABMNombre").value;
      personasArray[personIndex].apellido = document.getElementById("ABMApellido").value;
      personasArray[personIndex].fechaNacimiento = document.getElementById("ABMFechadeNacimiento").value;
      personasArray[personIndex].dni = parseInt(document.getElementById("ABMDNI").value);
      personasArray[personIndex].paisOrigen = document.getElementById("ABMPaisdeOrigen").value;
  
      const elemento = personasArray[personIndex];
  
      fetch('https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(elemento)
      })
      .then(response => {
        if (response.ok) {
          if (response.headers.get('Content-Type') === 'application/json') {
            return response.json();
          } else {
            return response.text();
          }
        } else {
          throw new Error('Error al obtener la respuesta del servidor');
        }
      })
      .then(data => {
        if (typeof data === 'string') {
          alert(data); // Show the success message
        } else {
          // Update local list with server response
          personasArray[personIndex] = data;
          // ...
        }
      })
      .catch(error => {
        console.error('Error al modificar persona:', error);
        alert('Error al modificar la persona. Por favor, intenta nuevamente.');
      });
    }
    VaciarTabla();
    MostrarTabla(personasArray);
  }

function irFormDatos(){

    form2.style.display='none';
    form1.style.display='block';
}

function vaciarInputsAgregar() {
    document.getElementById("ABMID").value = "";
    document.getElementById("ABMNombre").value = "";
    document.getElementById("ABMApellido").value = "";
    document.getElementById("ABMFechadeNacimiento").value = "";
    document.getElementById("ABMDNI").value = "";
    document.getElementById("ABMPaisdeOrigen").value = "";
   
  
}   
async function crearUsuarioNuevo() {
    
    
    let ABMNombre = document.getElementById("ABMNombre").value;
    let ABMApellido = document.getElementById("ABMApellido").value;
    let ABMFechadeNacimiento = document.getElementById("ABMFechadeNacimiento").value;
    let ABMDNI = parseInt(document.getElementById("ABMDNI").value);
    let ABMPaisdeOrigen = document.getElementById("ABMPaisdeOrigen").value;
    let tipoPersona = valorFiltro.value;
  
  
    // Crear el objeto de la nueva persona
    let personaNueva = {
      
      "apellido": ABMApellido,
      "nombre": ABMNombre,
      "fechaNacimiento": ABMFechadeNacimiento,
      "dni": tipoPersona === 'Ciudadano' ? ABMDNI : null,
      "paisOrigen": tipoPersona === 'Extranjero' ? ABMPaisdeOrigen : null,
      "tipo": tipoPersona
    };
  
    console.log("Persona a enviar:", JSON.stringify(personaNueva)); 
  
    try {
      // Enviar la solicitud para agregar la nueva persona
      const response = await fetch('https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(personaNueva)
      });
      
      console.log(response);
      const respuesta=await response.json();
      personaNueva.id= respuesta.id;
  
  
      
      personasArray.push(personaNueva);
      console.log(personaNueva);
      
      if (tipoPersona === 'Ciudadano') {
        listadeCiudadano.push(personaNueva);
      } else if (tipoPersona === 'Extranjero') {
        listadeExtranjero.push(personaNueva);
      }
      console.log("Persona agregada exitosamente:", personaNueva);
      VaciarTabla();
      MostrarTabla(personasArray);
    } catch (error) {
      console.error('Error al agregar persona:', error);
      alert('Error al agregar la persona. Por favor, intenta nuevamente.');
    }
  }
  
function botonCancelar(){

    const btnCancelar= document.getElementById('Cancelar');
    
    btnCancelar.addEventListener("click",function(){
    
        
        form2.style.display='none';
        form1.style.display='block';
    
    vaciarInputsAgregar();    
    EsconderInputEC();
    
    
    
    
    });
}
function botonAceptar(variable) {
    const Aceptar = document.getElementById("Aceptar");
    const valorFiltro = document.getElementById("filter-select1");
  
    Aceptar.addEventListener("click", function() {
      if (valorFiltro.value == '-') {
        alert("Ingrese TIPO valido");
        return;
      }
  
      if (variable == 'modificar') {
        let ABMID = parseInt(document.getElementById("ABMID").value);
        if (!isNaN(ABMID)) {
          variable = 'RESET';
          modificarUsuario(ABMID);
          irFormDatos();
          VaciarTabla();
          MostrarTabla(personasArray);
          vaciarInputsAgregar();
          EsconderInputEC();
        }
      } else if (variable == 'agregar') {
        variable = 'RESET';
        
        crearUsuarioNuevo();
        irFormDatos();
        vaciarInputsAgregar();
        VaciarTabla();
        MostrarTabla(personasArray);
        
        EsconderInputEC();
      } else if (variable == 'eliminar') {
        variable = 'RESET';
        let ABMID = parseInt(document.getElementById("ABMID").value);
        eliminarPersona(ABMID);
        irFormDatos();
        VaciarTabla();
        MostrarTabla(personasArray);
        vaciarInputsAgregar();
        EsconderInputEC();
      }
  
      
    });
  }
   
function validarIdUnico() {
    let listadeIDS = personasArray.map(persona => ({id: persona.id}));
    let nRandom=getNumeroRandom();
    let numeroId=0;
    listadeIDS.forEach(ID=>{
            
        if((ID.id)!=nRandom){
            numeroId=nRandom;
        }

    });
    return numeroId;
    
    


}
function getNumeroRandom() {
    return Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
}


function selectTipo(){
    const filter = document.getElementById("filter-select1");
    
    filter.addEventListener('change',function(){
    
        if (filter.value=='Ciudadano'){
        
        AtributosCiudadanos.style.display='block';
        AtributosExtranjeros.style.display='none';
        }
        if (filter.value=="Extranjero"){
            AtributosExtranjeros.style.display='block';
            AtributosCiudadanos.style.display='none';  
        }
    

    });

}

function eliminarPersona(ABMID) {
   
    
    
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Definir la función onload para manejar la respuesta
    xhr.onload = function() {
        
       
        if (xhr.status === 200) {
            
            personasArray = personasArray.filter(persona => persona.id != ABMID);
            listadeExtranjero = personasArray.filter(persona => persona.dni == null);
            listadeCiudadano = personasArray.filter(persona => persona.paisOrigen == null);
            console.log(ABMID);
            
            form1.style.display = "block";
            form2.style.display = "none";
            VaciarTabla();
            MostrarTabla(personasArray);

            alert('Persona eliminada con éxito.');
        } else {
            alert('No se pudo eliminar la persona.');
        }
    };

    // Enviar la solicitud de eliminación con el ID de la persona
    xhr.send(JSON.stringify({ id: ABMID }));

}

function ObtenerPersonas(){
    let personasA = [];
    let personasAr;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
        if (xhr.status == 200) {
            personasA = JSON.parse(xhr.responseText); 
            personasAr = JSON.stringify(personasA); 
            console.log("Data obtenida");
            
            console.log(personasAr);
             
        } else if (xhr.status == 404) {
            console.log("Archivo no encontrado");
        }
    };
    
    xhr.send();
    return personasAr;
}







let personasr= ObtenerPersonas();
let personasArray = JSON.parse(personasr);


let listadeExtranjero = personasArray.filter(persona=>(persona.dni == null));
let listadeCiudadano = personasArray.filter(persona =>(persona.paisOrigen == null));

let listadePersonas = personasArray.map(persona => ({id: persona.id, nombre: persona.nombre, apellido: persona.apellido, fechaNacimiento: persona.fechaNacimiento}));
let ABMID=document.getElementById("ABMID").value;
let ABMNombre=document.getElementById("ABMNombre").value;
let ABMApellido=document.getElementById("ABMApellido").value;
let ABMFechadeNacimiento=document.getElementById("ABMFechadeNacimiento").value;
let ABMDNI=parseInt(document.getElementById("ABMID").value);
let ABMPaisdeOrigen=document.getElementById("ABMPaisdeOrigen").value; 


const valorFiltro=document.getElementById('filter-select1');
const form1= document.getElementById('Formulario');
const form2=document.getElementById('Formulario2');

form1.style.display='block';

const AtributosCiudadanos = document.getElementById("AtributosCiudadanos");
const AtributosExtranjeros = document.getElementById("AtributosExtranjeros");

selectTipo();

MostrarTabla(personasArray); 

botonAgregar();
botonCancelar();









    
    

