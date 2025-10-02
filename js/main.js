// --- PEMANGGILAN ELEMEN DOM ---
const display = document.getElementById('display');
const tombolAngka = document.querySelectorAll('.angka');
const tombolOperator = document.querySelectorAll('.operator');
const tombolSamaDengan = document.getElementById('samaDengan');
const tombolAc = document.getElementById('ac');
const tombolTitik = document.querySelector('.titik');
const tombolNol = document.getElementById('btn0');

// --- VARIABEL STATE KALKULATOR ---
let angkaSekarang = '0';
let angkaPertama = null;
let operator = null;
let harusResetLayar = false;

// --- FUNGSI-FUNGSI UTAMA ---
function updateDisplay() {
    display.innerText = angkaSekarang;
}

function tambahAngka(angka) {
    if (harusResetLayar) {
        angkaSekarang = angka;
        harusResetLayar = false;
    } else {
        if (angkaSekarang === '0') {
            angkaSekarang = angka;
        } else {
            angkaSekarang += angka;
        }
    }
    updateDisplay();
}

function pilihOperator(op) {
    if (operator !== null) hitung();
    angkaPertama = angkaSekarang;
    operator = op;
    angkaSekarang = '';
}

function hitung() {
    let hasil;
    const prev = parseFloat(angkaPertama);
    const current = parseFloat(angkaSekarang);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': hasil = prev + current; break;
        case '-': hasil = prev - current; break;
        case 'x': hasil = prev * current; break;
        case '/':
            if (current === 0) {
                alert("Error: Tidak bisa dibagi dengan nol!");
                hapusSemua();
                return;
            }
            hasil = prev / current;
            break;
        default: return;
    }

    angkaSekarang = hasil.toString();
    operator = null;
    angkaPertama = null;
    harusResetLayar = true;
    updateDisplay();
}

function hapusSemua() {
    angkaSekarang = '0';
    angkaPertama = null;
    operator = null;
    harusResetLayar = false;
    updateDisplay();
}

// --- EVENT LISTENERS ---
tombolAngka.forEach(button => {
    button.addEventListener('click', () => tambahAngka(button.innerText));
});

tombolNol.addEventListener('click', () => tambahAngka('0'));

tombolTitik.addEventListener('click', () => {
    if (!angkaSekarang.includes('.')) {
        tambahAngka('.');
    }
});

tombolOperator.forEach(button => {
    if (button.id !== 'samaDengan') {
        button.addEventListener('click', () => pilihOperator(button.innerText));
    }
});

tombolSamaDengan.addEventListener('click', hitung);
tombolAc.addEventListener('click', hapusSemua);