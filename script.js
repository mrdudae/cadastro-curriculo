class Flower {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

class FlowerApp {
    constructor() {
        this.flowers = [];
        this.editIndex = null;
        this.renderFlowers();
    }

    addFlower() {
        const name = document.getElementById('flowerName').value;
        const color = document.getElementById('flowerColor').value;
        if (name && color) {
            if (this.editIndex !== null) {
                this.flowers[this.editIndex] = new Flower(name, color);
                this.editIndex = null;
            } else {
                this.flowers.push(new Flower(name, color));
            }
            this.clearForm();
            this.renderFlowers();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }

    editFlower(index) {
        document.getElementById('flowerName').value = this.flowers[index].name;
        document.getElementById('flowerColor').value = this.flowers[index].color;
        this.editIndex = index;
    }

    deleteFlower(index) {
        this.flowers.splice(index, 1);
        this.renderFlowers();
    }

    clearForm() {
        document.getElementById('flowerName').value = '';
        document.getElementById('flowerColor').value = '';
    }

    renderFlowers() {
        const flowerList = document.getElementById('flower-list');
        flowerList.innerHTML = '';
        this.flowers.forEach((flower, index) => {
            const flowerDiv = document.createElement('div');
            flowerDiv.className = 'flower-item';
            flowerDiv.innerHTML = `
                <span>${flower.name} - ${flower.color}</span>
                <div class="flower-actions">
                    <button onclick="flowerApp.editFlower(${index})">Editar</button>
                    <button onclick="flowerApp.deleteFlower(${index})">Deletar</button>
                </div>
            `;
            flowerList.appendChild(flowerDiv);
        });
    }
}

const flowerApp = new FlowerApp();
