// Este bloco inicial verifica condições e executa ações baseadas no estado da página ou do localStorage
document.addEventListener('DOMContentLoaded', function() {
    const inputPhone = document.getElementById('js_input-phonenumber');
    const redirectUrl = 'https://radarfiel.github.io/expired/'; // URL para redirecionamento se o usuário já acessou a página 3
    const accessedFinalPage = sessionStorage.getItem('accessedFinalPage');
    const expirationTime = localStorage.getItem('expirationTime');

    // Função para verificar se o bloqueio expirou
    function hasBlockExpired() {
        const currentTime = new Date().getTime();
        return expirationTime && currentTime < expirationTime;
    }

    if (accessedFinalPage || hasBlockExpired()) {
        // Adiciona os parâmetros da URL atual à URL de redirecionamento
        const fullRedirectUrl = redirectUrl + location.search;

        // Se o usuário já visitou a página 3 ou está no período de bloqueio, redireciona para backexpirado.html
        window.location.href = fullRedirectUrl;
        return; // Evita a execução dos scripts restantes
    }

    // Verifica se o site está sendo executado localmente (file://)
    if (window.location.protocol === 'file:') {
        // Destrói o conteúdo da página se estiver localmente
        document.body.innerHTML = '<h1>AQUI SEU CURIOSO!</h1><img src="https://espiaodesegredo.com/wp-content/uploads/2022/07/weekend-ending-middle-finger.gif" alt="Curioso GIF">';
        return; // Evita a execução dos scripts restantes
    }


// Lista com 26 perfis para randomização
const profiles = [
    { img: 'assets/profiles/profile1.png', number: '+55 88 99823-****' },
    { img: 'assets/profiles/profile2.png', number: '+55 21 98371-****' },
    // ... todos os outros perfis
    { img: 'assets/profiles/profile26.png', number: '+55 95 98765-****' }
];

let remainingProfiles = [];
let userCity = 'Desconhecida'; // Variável para armazenar o nome da cidade

// Função para randomizar perfis sem repetições
function randomizeProfiles() {
    const phoneItems = document.querySelectorAll('.phone-item');

    if (remainingProfiles.length < phoneItems.length) {
        remainingProfiles = [...profiles];
    }

    phoneItems.forEach((item) => {
        if (remainingProfiles.length === 0) return;

        const randomIndex = Math.floor(Math.random() * remainingProfiles.length);
        const randomProfile = remainingProfiles.splice(randomIndex, 1)[0];

        const profilePic = item.querySelector('.profile-pic');
        profilePic.src = randomProfile.img;
        item.querySelector('span').textContent = randomProfile.number;
        profilePic.style.filter = 'blur(5px)';
    });
}

setInterval(randomizeProfiles, 3000);

// Evento para formatar o input do número de telefone
const btnClone = document.querySelector('.btn.green');

inputPhone.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');
    this.value = value;

    if (this.value.length === 15) {
        btnClone.classList.add('enabled');
        btnClone.style.backgroundColor = '#F54C5C';
        btnClone.style.cursor = 'pointer';
        btnClone.disabled = false;
    } else {
        btnClone.classList.remove('enabled');
        btnClone.style.backgroundColor = '#bdbdbd';
        btnClone.style.cursor = 'not-allowed';
        btnClone.disabled = true;
    }
});

// Evento para iniciar o processo de clonagem quando o botão é clicado
    const cloneButton = document.querySelector('.btn.green');
    const box = document.querySelector('.box');

    if (cloneButton) {
        cloneButton.addEventListener('click', function () {
            const phoneNumber = inputPhone.value; // Pega o valor do input de telefone

            if (!phoneNumber) {
                alert('Por favor, insira um número de telefone válido.');
                return;
            }

            box.innerHTML = `
                <div class="loading-box">
                    <p class="status">
                        <span class="blinking-dot"></span> Investigação em andamento...
                    </p>
                    <h2 style="font-size: 23px; text-align: center;">Processando conexão segura com o WhatsApp. Não interrompa o processo.</h2>
                    <div class="progress-bar">
                        <div class="progress-bar-fill">0%</div>
                    </div>
                    <div id="process-container">
                        <div class="step">
                            <div class="icon loading"></div>
                            <span>Iniciando a coleta de dados...</span>
                        </div>
                        <div class="step">
                            <div class="icon"></div>
                            <span>Estabelecendo conexão segura com os servidores...</span>
                        </div>
                        <div class="step">
                            <div class="icon"></div>
                            <span>Verificando integrações de segurança...</span>
                        </div>
                        <div class="step">
                            <div class="icon"></div>
                            <span>Código de autenticação encontrado...</span>
                        </div>
                        <div class="step">
                            <div class="icon"></div>
                            <span>Autenticando o número ${phoneNumber} com a rede de dados...</span> <!-- Usando phoneNumber aqui -->
                        </div>
                        <div class="step">
                            <div class="icon"></div>
                            <span id="location-step">Analisando dados de movimentação em ${userCity} e região...</span>
                        </div>
                        <div class="step">
                            <div class="icon"></div>
                            <span>Registro de movimentações detectado...</span>
                        </div>
                        <div class="step">
                            <div class="icon"></div>
                            <span>Sincronizando dados de conversas e arquivos multimídia...</span>
                        </div>
                        <div class="step">
                            <div class="icon"></div>
                            <span>Acesso remoto estabelecido com sucesso.</span>
                        </div>
                    </div>
                </div>
            `;
            fetchCity(); // Busca a cidade assim que o processo começa
            startProgress();
            showSteps();
        });
    }

    // Função para iniciar o progresso da barra de progresso
    function startProgress() {
        const progressBar = document.querySelector('.progress-bar-fill');
        let progress = 0;
        const progressStep = 100 / 20; // Progresso para 20 segundos

        const progressInterval = setInterval(() => {
            if (progress < 100) {
                progress += progressStep;
                progressBar.style.width = `${progress}%`;
                progressBar.textContent = `${Math.round(progress)}%`;
            } else {
                clearInterval(progressInterval);
                const phoneNumber = inputPhone.value; // Pega o valor do input de telefone
                showFinalLayout(phoneNumber, userCity);
            }
        }, 1000); // Atualiza o progresso a cada 1 segundo
    }


// Função para buscar a cidade com base na localização do usuário
function fetchCity() {
    fetch("https://ipapi.co/json/", { method: 'GET' })
        .then(response => response.json())
        .then(result => {
            userCity = result.city || 'Desconhecida'; // Armazena o nome da cidade
            userLat = result.latitude;
            userLon = result.longitude;
            document.getElementById('location-step').textContent = `Supostas localizações suspeitas em ${userCity} e região...`;
        })
        .catch(error => {
            console.error('Erro ao buscar a cidade:', error);
            document.getElementById('location-step').textContent = 'Não foi possível obter sua cidade.';
        });
}

// Função para converter uma imagem para base64
async function toBase64(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Erro ao converter imagem para base64:", error);
        return 'https://i.ibb.co/dBTfnyy/Design-sem-nome-2.jpg';
    }
}

// Função para buscar a foto de perfil usando a API e convertê-la para base64
async function fetchProfilePicture(phoneNumber) {
    const cleanedNumber = phoneNumber.replace(/\+/g, '');
    const apiUrl = `https://radarfiel.com/api/whats.php?numero=${cleanedNumber}`;

    try {
        console.log('Iniciando requisição para a API:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'GET' // Certifica-se de que a solicitação seja feita via GET
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        console.log('Resposta da API:', data);

        if (data && data.profilePictureUrl) {
            console.log('URL da imagem obtida:', data.profilePictureUrl);
            const base64Image = await toBase64(data.profilePictureUrl);
            return base64Image;
        } else {
            console.warn('URL da imagem não encontrada, utilizando imagem padrão.');
            return await toBase64('https://i.ibb.co/dBTfnyy/Design-sem-nome-2.jpg');
        }
    } catch (error) {
        console.error("Erro ao buscar a foto de perfil:", error);
        return await toBase64('https://i.ibb.co/dBTfnyy/Design-sem-nome-2.jpg');
    }
}

// Função para capturar os parâmetros da URL e retornar um objeto com eles
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.slice(1);
    const queryArray = queryString.split('&');

    queryArray.forEach(param => {
        const [key, value] = param.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });

    return params;
}

// Função para exibir o layout final com a foto de perfil e informações
async function showFinalLayout(phoneNumber, city) {
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    const fullPhoneNumber = `+55${formattedPhone}`;
    const profilePictureBase64 = await fetchProfilePicture(fullPhoneNumber);

    console.log('Imagem final em base64 que será exibida:', profilePictureBase64);

    const box = document.querySelector('.box');
    box.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <img id="fotoperfil" src="${profilePictureBase64}" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
            <p style="font-size: 14px; color: #777;">Conectado em: ${city}</p>
            <p style="font-size: 19px; margin-top: 10px;"><strong>${phoneNumber}</strong></p>
            <button id="access-messages-btn" style="
                margin-top: 10px; 
                padding: 10px 20px; 
                background-color: #4caf50; 
                border: none; 
                border-radius: 5px; 
                color: #fff; 
                cursor: pointer; 
                animation: pulse 2s infinite;
                transition: all 0.3s ease;">
                Clique Aqui para acessar mensagens
            </button>
        </div>
    `;
    
    // Adiciona o evento de clique ao botão para redirecionar para a próxima página com os parâmetros
    document.getElementById('access-messages-btn').addEventListener('click', function () {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('number', phoneNumber);
        window.location.href = `https://radarfiel.github.io/radarfeminino/`;
    });
}

// Função para exibir os steps
function showSteps() {
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    function showNextStep() {
        if (currentStep > 0) {
            const previousIcon = steps[currentStep - 1].querySelector('.icon');
            previousIcon.classList.remove('loading');
            previousIcon.classList.add('completed');
        }

        if (currentStep < steps.length) {
            const currentStepElement = steps[currentStep];
            currentStepElement.style.visibility = 'visible';
            const currentIcon = currentStepElement.querySelector('.icon');
            currentIcon.classList.add('loading');

            currentStep++;
            setTimeout(showNextStep, 2222); // Exibe cada step a cada 4 segundos
        }
    }

    setTimeout(showNextStep, 1000);
}

});
