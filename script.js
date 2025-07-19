// Fungsi untuk menghitung luas dan keliling segi empat
function hitungSegiEmpat() {
    // Ambil nilai input
    const panjang = parseFloat(document.getElementById('panjang').value);
    const lebar = parseFloat(document.getElementById('lebar').value);
    
    // Validasi input
    if (isNaN(panjang) || isNaN(lebar) || panjang <= 0 || lebar <= 0) {
        alert('Mohon masukkan nilai panjang dan lebar yang valid (lebih dari 0)!');
        return;
    }
    
    // Hitung luas dan keliling
    const luas = panjang * lebar;
    const keliling = 2 * (panjang + lebar);
    
    // Tampilkan hasil dengan animasi
    animateResult('hasil-luas-rectangle', luas.toFixed(2));
    animateResult('hasil-keliling-rectangle', keliling.toFixed(2));
    
    // Scroll ke hasil
    document.querySelector('#rectangle-calculator .result-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Fungsi untuk menghitung luas dan keliling segitiga
function hitungSegitiga() {
    // Ambil nilai input
    const alas = parseFloat(document.getElementById('alas').value);
    const tinggi = parseFloat(document.getElementById('tinggi').value);
    const sisi1 = parseFloat(document.getElementById('sisi1').value);
    const sisi2 = parseFloat(document.getElementById('sisi2').value);
    const sisi3 = parseFloat(document.getElementById('sisi3').value);
    
    // Validasi input untuk luas (alas dan tinggi)
    if (isNaN(alas) || isNaN(tinggi) || alas <= 0 || tinggi <= 0) {
        alert('Mohon masukkan nilai alas dan tinggi yang valid (lebih dari 0) untuk menghitung luas!');
        return;
    }
    
    // Validasi input untuk keliling (ketiga sisi)
    if (isNaN(sisi1) || isNaN(sisi2) || isNaN(sisi3) || sisi1 <= 0 || sisi2 <= 0 || sisi3 <= 0) {
        alert('Mohon masukkan nilai ketiga sisi yang valid (lebih dari 0) untuk menghitung keliling!');
        return;
    }
    
    // Validasi segitiga (aturan ketidaksamaan segitiga)
    if (sisi1 + sisi2 <= sisi3 || sisi1 + sisi3 <= sisi2 || sisi2 + sisi3 <= sisi1) {
        alert('Nilai sisi yang dimasukkan tidak dapat membentuk segitiga yang valid!');
        return;
    }
    
    // Hitung luas dan keliling
    const luas = 0.5 * alas * tinggi;
    const keliling = sisi1 + sisi2 + sisi3;
    
    // Tampilkan hasil dengan animasi
    animateResult('hasil-luas-triangle', luas.toFixed(2));
    animateResult('hasil-keliling-triangle', keliling.toFixed(2));
    
    // Scroll ke hasil
    document.querySelector('#triangle-calculator .result-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Fungsi untuk switching tab
function switchTab(tabName) {
    // Sembunyikan semua calculator content
    const calculatorContents = document.querySelectorAll('.calculator-content');
    calculatorContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Hapus active class dari semua tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Tampilkan calculator content yang dipilih
    document.getElementById(tabName + '-calculator').classList.add('active');
    
    // Tambahkan active class ke tab button yang dipilih
    event.target.classList.add('active');
    
    // Reset hasil perhitungan saat switch tab
    resetKalkulator(tabName);
}

// Fungsi untuk animasi hasil
function animateResult(elementId, value) {
    const element = document.getElementById(elementId);
    
    // Reset nilai
    element.textContent = '0';
    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0.5';
    
    // Animasi counter
    let current = 0;
    const target = parseFloat(value);
    const increment = target / 50; // 50 steps untuk animasi
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            
            // Animasi selesai
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }
        element.textContent = current.toFixed(2);
    }, 20);
    
    // Tambahkan efek bounce
    setTimeout(() => {
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }, 1000);
}

// Fungsi untuk reset kalkulator
function resetKalkulator(type) {
    if (type === 'rectangle') {
        // Reset input fields untuk segi empat
        document.getElementById('panjang').value = '';
        document.getElementById('lebar').value = '';
        
        // Reset hasil segi empat
        document.getElementById('hasil-luas-rectangle').textContent = '-';
        document.getElementById('hasil-keliling-rectangle').textContent = '-';
        
        // Focus ke input pertama
        document.getElementById('panjang').focus();
    } else if (type === 'triangle') {
        // Reset input fields untuk segitiga
        document.getElementById('alas').value = '';
        document.getElementById('tinggi').value = '';
        document.getElementById('sisi1').value = '';
        document.getElementById('sisi2').value = '';
        document.getElementById('sisi3').value = '';
        
        // Reset hasil segitiga
        document.getElementById('hasil-luas-triangle').textContent = '-';
        document.getElementById('hasil-keliling-triangle').textContent = '-';
        
        // Focus ke input pertama
        document.getElementById('alas').focus();
    }
    
    // Reset style hasil
    const resultElements = document.querySelectorAll('.result-value');
    resultElements.forEach(element => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    });
    
    // Scroll ke atas
    document.querySelector('header').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Event listener untuk Enter key
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners untuk input segi empat
    const rectangleInputs = ['panjang', 'lebar'];
    rectangleInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    hitungSegiEmpat();
                }
            });
            
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
            
            input.addEventListener('input', function() {
                validateInput(this);
            });
        }
    });
    
    // Event listeners untuk input segitiga
    const triangleInputs = ['alas', 'tinggi', 'sisi1', 'sisi2', 'sisi3'];
    triangleInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    hitungSegitiga();
                }
            });
            
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
            
            input.addEventListener('input', function() {
                validateInput(this);
            });
        }
    });
    
    // Animasi loading saat halaman dimuat
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Fungsi untuk menampilkan tips
function showTip() {
    const tips = [
        "Tip: Tekan Enter setelah mengisi nilai untuk menghitung!",
        "Tip: Segi empat adalah bangun datar dengan 4 sisi!",
        "Tip: Segitiga adalah bangun datar dengan 3 sisi!",
        "Tip: Luas menunjukkan area dalam bangun datar!",
        "Tip: Keliling adalah jumlah semua sisi bangun datar!",
        "Tip: Gunakan tab untuk beralih antara segi empat dan segitiga!",
        "Tip: Untuk segitiga, pastikan ketiga sisi dapat membentuk segitiga yang valid!"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    // Buat elemen tip
    const tipElement = document.createElement('div');
    tipElement.className = 'tip-popup';
    tipElement.textContent = randomTip;
    tipElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(tipElement);
    
    // Hapus tip setelah 4 detik
    setTimeout(() => {
        tipElement.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            if (document.body.contains(tipElement)) {
                document.body.removeChild(tipElement);
            }
        }, 500);
    }, 4000);
}

// Tampilkan tip secara acak
setInterval(showTip, 15000);

// Tambahkan CSS untuk animasi tip
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in;
    }
`;
document.head.appendChild(style);


// Fungsi untuk validasi input real-time
function validateInput(input) {
    const value = parseFloat(input.value);
    const inputGroup = input.parentElement;
    
    if (isNaN(value) || value <= 0) {
        inputGroup.style.borderLeft = '4px solid #f44336';
    } else {
        inputGroup.style.borderLeft = '4px solid #4CAF50';
    }
}

