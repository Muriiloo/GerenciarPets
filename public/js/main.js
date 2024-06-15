document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                window.location.href = 'menu.html';
            } else {
                alert('Credenciais inválidas');
            }
        });
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            await fetch('/auth/logout', { method: 'POST' });
            window.location.href = 'login.html';
        });
    }

    const interestForm = document.getElementById('interestForm');
    if (interestForm) {
    interestForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (!name || !email || !phone) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return; 
        }
    
        if (!/^[a-zA-Z\s]*$/.test(name)) {
            alert('O nome deve conter apenas letras e espaços.');
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
    
        if (!/^\d+$/.test(phone)) {
            alert('O número de telefone deve conter apenas dígitos.');
            return;
        }
    
        if (phone.length !== 12) {
            alert('O número de telefone deve ter 12 dígitos.');
            return;
        }

        const response = await fetch('/interests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone })
        });

        if (response.ok) {
            alert('Interessado cadastrado com sucesso!');
            interestForm.reset();

            
        } else {
            alert('Falha ao cadastrar');
        }
    
    });
}


    const petForm = document.getElementById('petForm');
    if (petForm) {
    petForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const breed = document.getElementById('breed').value;
        const age = document.getElementById('age').value;

        
        if (name === '' || breed === '' || age === '')  {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return; 
        }

        
        if (isNaN(parseInt(age))) {
            alert('A idade deve ser um número válido!');
            return;
        }

       
        if (parseInt(age) <= 0) {
            alert('A idade deve ser maior que zero!');
            return;
        }

        
        const response = await fetch('/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, breed, age })
        });

        if (response.ok) {
            alert('Pet cadastrado com sucesso');
            petForm.reset();
        } else {
            alert('Falha ao cadastrar pet');
        }
    });
}

    const adoptForm = document.getElementById('adoptForm');
    if (adoptForm) {
        adoptForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const interestId = document.getElementById('interest').value;
            const petId = document.getElementById('pet').value;

            const response = await fetch('/adoptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ interestId, petId })
            });

            if (response.ok) {
                alert('Adoção registrada com sucesso');
                adoptForm.reset();
            } else {
                alert('Falha ao registrar adoção');
            }
        });

        const fetchDropdownData = async () => {
            const interestsResponse = await fetch('/interests');
            const interests = await interestsResponse.json();
            const petsResponse = await fetch('/pets');
            const pets = await petsResponse.json();

            const interestSelect = document.getElementById('interest');
            interests.forEach(interest => {
                const option = document.createElement('option');
                option.value = interest.id;
                option.textContent = interest.name;
                interestSelect.appendChild(option);
            });

            const petSelect = document.getElementById('pet');
            pets.forEach(pet => {
                const option = document.createElement('option');
                option.value = pet.id;
                option.textContent = pet.name;
                petSelect.appendChild(option);
            });
        };

        fetchDropdownData();
    }
});
