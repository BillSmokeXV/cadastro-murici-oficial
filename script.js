
// Dados simulados para demonstração
let candidatos = [
    {
        id: 'joao',
        nome: 'João Silva',
        cpf: '123.456.789-00',
        telefone: '(11) 99999-9999',
        email: 'joao@email.com',
        categoria: 'Motorista TAC',
        base: 'SP01',
        documentos: {
            cnh: 'pendente',
            comprovante: 'pendente',
            crlv: 'pendente',
            rg: 'pendente'
        }
    },
    {
        id: 'maria',
        nome: 'Maria Santos',
        cpf: '987.654.321-00',
        telefone: '(21) 88888-8888',
        email: 'maria@email.com',
        categoria: 'Ajudante',
        base: 'RJ02',
        documentos: {
            cnh: 'aprovado',
            comprovante: 'aprovado',
            crlv: 'aprovado',
            rg: 'aprovado'
        }
    }
];

// Manipulação de arquivos
document.addEventListener('DOMContentLoaded', function() {
    const fileInputs = ['cnh', 'comprovante', 'crlv', 'docProprietario', 'rg', 'antt', 'carteiraTrabalho'];
    
    fileInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        const nameSpan = document.getElementById(inputId + '-name');
        
        if (input && nameSpan) {
            input.addEventListener('change', function() {
                if (this.files[0]) {
                    nameSpan.textContent = this.files[0].name;
                    nameSpan.classList.add('text-green-600');
                }
            });
        }
    });
});

// Formatação de campos
document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
});

// Funções utilitárias
function showAlert(message, type = 'info') {
    // Implementação básica de alert
    // Pode ser substituída por uma biblioteca de notificações mais sofisticada
    alert(message);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.length === 11;
}

function validatePhone(phone) {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return cleanPhone.length >= 10;
}

// Função para salvar dados no localStorage (se necessário)
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        return false;
    }
}

// Função para carregar dados do localStorage
function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
        return null;
    }
}

// Função para gerar ID único
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função para formatar data
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

// Função para debounce (útil para campos de busca)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}