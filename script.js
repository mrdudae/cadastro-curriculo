class Person {
    constructor(name, age, profession) {
        this.name = name;
        this.age = age;
        this.profession = profession;
    }
}

class CurriculumApp {
    constructor() {
        this.people = []; // Array para armazenar os currículos
        this.editingIndex = null; 
        this.init();
    }

    init() {
        document.querySelector('button').addEventListener('click', () => this.addOrUpdatePerson());
        this.renderList();
    }

    addOrUpdatePerson() {
        const name = document.getElementById('personName').value;
        const age = document.getElementById('personAge').value;
        const profession = document.getElementById('personProfession').value;

        if (name && age && profession) {
            if (this.editingIndex !== null) {
                this.people[this.editingIndex] = new Person(name, age, profession);
                this.editingIndex = null;
                document.querySelector('button').innerText = "Cadastrar";
            } else {
                const newPerson = new Person(name, age, profession);
                this.people.push(newPerson);
            }

            this.clearForm();
            this.renderList();
        } else {
            alert('Preencha todos os campos.');
        }
    }
 // Preenche o formulário com os dados da pessoa a ser editada
    editPerson(index) {
        const person = this.people[index];
        document.getElementById('personName').value = person.name;
        document.getElementById('personAge').value = person.age;
        document.getElementById('personProfession').value = person.profession;

        this.editingIndex = index;
        document.querySelector('button').innerText = "Atualizar";
    }

    removePerson(index) {
        this.people.splice(index, 1); // Remove a pessoa do array
        this.renderList();
        this.clearForm();
    }

    renderList() {
        const curriculumList = document.getElementById('curriculum-list');
        curriculumList.innerHTML = ''; // Limpa a lista antes de renderizar
    
        this.people.forEach((person, index) => {
            const personItem = document.createElement('div');
            personItem.className = 'curriculum-item';
    
            personItem.innerHTML = `
                <div class="curriculum-content">
                    <span><strong>Nome:</strong> ${person.name}</span>
                    <span><strong>Idade:</strong> ${person.age}</span>
                    <span><strong>Profissão:</strong> ${person.profession}</span>
                </div>
                <div class="curriculum-actions">
                    <button class="button-curriculm" onclick="curriculumApp.editPerson(${index})">Editar</button>
                    <button class="button-curriculm" onclick="curriculumApp.removePerson(${index})">Remover</button>
                </div>
            `;
    
            curriculumList.appendChild(personItem);
        });
    }

    clearForm() {
        document.getElementById('personName').value = '';
        document.getElementById('personAge').value = '';
        document.getElementById('personProfession').value = '';
        document.querySelector('button').innerText = "Cadastrar";
    }
}

const curriculumApp = new CurriculumApp();


// Apenas aceitar numeros, na opção idade

document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.querySelector('.form-container');
    const inputs = formContainer.querySelectorAll('input');
    const personAgeInput = document.getElementById('personAge');

    personAgeInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, ''); 
    });

    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                    inputs[index + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
                } 
            }
        });
    });
});