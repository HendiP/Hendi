// src/App.js
// Final update: 29 Juni 2025, 22:30 WIB (Medan)

// --- Import Library & Styles ---
import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

// --- Data Aplikasi ---
const productsData = [
    { id: 1, name: "Yamaha APX 500ii", image: "img/YAMAHA.png", description: "Gitar elektro-akustik serbaguna dengan body ramping yang nyaman dan preamp SYSTEM66 untuk performa panggung yang jernih. Cocok untuk pemula hingga pemain menengah yang mencari kualitas Yamaha.", price: 3850000 },
    { id: 2, name: "Cort Sfx Dao Nat", image: "img/CORT.png", description: "Desain body Slim dengan cutaway dan top kayu Dao yang eksotis, menghasilkan resonansi hangat dan tampilan menawan. Dilengkapi preamp Fishman Isys+ untuk suara elektrik yang kaya.", price: 4100000 },
    { id: 3, name: "Segovia D 07 Gn", image: "img/segovi.png", description: "Gitar akustik tradisional dengan finishing Glossy Natural yang elegan. Memberikan tone yang kaya dan hangat, ideal untuk musisi klasik, fingerstyle, atau pemula yang serius.", price: 2250000 },
    { id: 4, name: "Taylor Gs Mini", image: "img/TAYLOR.png", description: "Gitar akustik travel yang kompak namun dengan suara yang sangat besar dan penuh. Desain ergonomis membuatnya nyaman dimainkan di mana saja, ideal untuk musisi yang sering bepergian.", price: 13500000 },
    { id: 5, name: "Donner Husk I Pro", image: "img/DONER.png", description: "Gitar silent elektrik inovatif dengan desain headless dan dapat dilipat. Solusi sempurna untuk latihan tanpa bising, cocok untuk musisi yang butuh portabilitas dan fitur canggih.", price: 3750000 },
    { id: 6, name: "Lava ME 3", image: "img/LAVA.png", description: "Gitar pintar futuristik berbahan serat karbon dengan sistem FreeBoost® yang memungkinkan efek tanpa ampli. Layar sentuh terintegrasi untuk tuner, looper, dan efek langsung. Pengalaman bermain yang revolusioner.", price: 12999000 },
];

// --- Komponen-Komponen Reusable ---

const AppHeader = () => (
    <header className="bg-primary text-white text-center py-3 shadow">
        <h1 className="mb-0 display-5 fw-bolder header-tagline">Hendi'S Guitar - Melodi Impian Anda Dimulai Di Sini.</h1>
    </header>
);

const HeroSection = ({ onScrollToRegister }) => (
    <section className="bg-white p-5 rounded shadow-sm my-4 position-relative overflow-hidden text-center">
        <div className="hero-content position-relative z-index-1">
            <h1 className="text-primary display-4 fw-bold mb-3">Temukan Gitar Impian Anda & Wujudkan Melodi Terbaik Anda!</h1>
            <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
                Kami menyediakan koleksi gitar terlengkap dari brand terkemuka, siap menemani setiap petikan Anda. Rasakan kualitas suara premium dengan harga terbaik.
            </p>
            <a href="#registrationSection" className="btn btn-primary btn-lg rounded-pill shadow-sm cta-hero-button" onClick={onScrollToRegister}>
                Lihat Koleksi & Dapatkan Promo!
            </a>
        </div>
    </section>
);

const ProductCard = ({ product, onBuyClick }) => (
    <div className="card h-100 bg-light text-center shadow-sm d-flex flex-column">
        <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            style={{ height: '200px', objectFit: 'cover', borderBottom: '2px solid var(--accent-color)' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
            <h3 className="card-title text-primary fs-4 fw-bold mt-3">{product.name}</h3>
            <p className="card-text text-muted mb-3 flex-grow-1">{product.description}</p>
            <span className="d-block text-danger fs-2 fw-bolder mb-3 price-display">
                Rp {product.price.toLocaleString('id-ID')}
            </span>
            <a
                href="#registrationSection"
                className="btn btn-primary rounded-pill mx-3"
                onClick={(e) => onBuyClick(e, product.name)}
            >
                Beli Sekarang
            </a>
        </div>
    </div>
);

const ProductSection = ({ onBuyClick }) => (
    <section className="section bg-white p-5 rounded shadow-sm my-4">
        <h2 className="text-center text-primary fs-1 fw-bold mb-5 position-relative">
            Koleksi Gitar Terbaik Kami
        </h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
            {productsData.map(product => (
                <div className="col" key={product.id}>
                    <ProductCard
                        product={product}
                        onBuyClick={onBuyClick}
                    />
                </div>
            ))}
        </div>
    </section>
);

const LoanCalculator = () => {
    const [price, setPrice] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const calculateLoan = (event) => {
        event.preventDefault();
        setError('');
        setResult(null);

        const parsedPrice = parseFloat(price);
        const parsedDownPayment = parseFloat(downPayment) || 0;
        const parsedInterestRate = parseFloat(interestRate) / 100 / 12;
        const parsedLoanTerm = parseInt(loanTerm);

        if (isNaN(parsedPrice) || parsedPrice <= 0 ||
            isNaN(parsedInterestRate) || parsedInterestRate < 0 ||
            isNaN(parsedLoanTerm) || parsedLoanTerm <= 0) {
            setError('Mohon masukkan nilai yang valid untuk semua kolom yang wajib diisi.');
            return;
        }

        const principal = parsedPrice - parsedDownPayment;
        let monthlyPayment;

        if (parsedInterestRate === 0) {
            monthlyPayment = principal / parsedLoanTerm;
        } else {
            monthlyPayment = principal * (parsedInterestRate * Math.pow(1 + parsedInterestRate, parsedLoanTerm)) /
                             (Math.pow(1 + parsedInterestRate, parsedLoanTerm) - 1);
        }

        const totalPayment = monthlyPayment * parsedLoanTerm;
        const totalInterest = totalPayment - principal;

        setResult({
            principal,
            monthlyPayment,
            totalPayment,
            totalInterest,
        });
    };

    return (
        <section className="section calculator-section bg-white p-5 rounded shadow-sm my-4">
            <h2 className="text-center text-primary fs-1 fw-bold mb-5 position-relative">Hitung Cicilan Impian Anda</h2>
            <form onSubmit={calculateLoan} className="calculator-form">
                <div className="mb-3">
                    <label htmlFor="price" className="form-label fw-bold">Harga Produk (Rp):</label>
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        placeholder="Masukkan harga produk"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="downPayment" className="form-label fw-bold">Uang Muka (Rp):</label>
                    <input
                        type="number"
                        id="downPayment"
                        className="form-control"
                        placeholder="Masukkan uang muka"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="interestRate" className="form-label fw-bold">Tingkat Bunga Tahunan (%):</label>
                    <input
                        type="number"
                        id="interestRate"
                        step="0.01"
                        className="form-control"
                        placeholder="Misal: 5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="loanTerm" className="form-label fw-bold">Jangka Waktu (Bulan):</label>
                    <input
                        type="number"
                        id="loanTerm"
                        className="form-control"
                        placeholder="Misal: 12, 24, 36"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">Hitung Cicilan</button>
            </form>
            <div className="calculator-result bg-light p-3 mt-4 rounded border text-primary fw-bold">
                {error && <p className="text-danger mb-0">{error}</p>}
                {result && (
                    <>
                        <p className="mb-2"><strong>Jumlah Pinjaman Pokok:</strong> Rp {result.principal.toLocaleString('id-ID')}</p>
                        <p className="mb-2"><strong>Cicilan Bulanan:</strong> Rp {result.monthlyPayment.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="mb-2"><strong>Total Pembayaran:</strong> Rp {result.totalPayment.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="mb-0"><strong>Total Bunga:</strong> Rp {result.totalInterest.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </>
                )}
            </div>
        </section>
    );
};

const RegistrationForm = ({ message }) => {
    const [formData, setFormData] = useState({
        fullName: '', email: '', address: '', gender: '', phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        alert('Terima kasih sudah mendaftar! Kami akan segera menghubungi Anda.');
        setFormData({ fullName: '', email: '', address: '', gender: '', phone: '' });
    };

    return (
        <section className="section registration-section bg-white p-5 rounded shadow-sm my-4" id="registrationSection">
            {message && (
                <div className="alert alert-warning text-primary fw-bold" role="alert">
                    {message}
                </div>
            )}
            <h2 className="text-center text-primary fs-1 fw-bold mb-5 position-relative">Daftar Sekarang & Dapatkan Penawaran Spesial!</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label fw-bold">Nama Lengkap:</label>
                    <input type="text" id="fullName" name="fullName" className="form-control" placeholder="Masukkan nama lengkap Anda" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Email:</label>
                    <input type="email" id="email" name="email" className="form-control" placeholder="Masukkan email Anda" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label fw-bold">Alamat:</label>
                    <input type="text" id="address" name="address" className="form-control" placeholder="Masukkan alamat lengkap Anda" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label fw-bold">Jenis Kelamin:</label>
                    <select id="gender" name="gender" className="form-select" value={formData.gender} onChange={handleChange} required>
                        <option value="">Pilih</option>
                        <option value="pria">Pria</option>
                        <option value="wanita">Wanita</option>
                        <option value="lainnya">Lainnya</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="form-label fw-bold">Nomor Telepon (opsional):</label>
                    <input type="text" id="phone" name="phone" className="form-control" placeholder="Masukkan nomor telepon Anda" value={formData.phone} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">Daftar Sekarang</button>
            </form>
        </section>
    );
};

const AppFooter = () => (
    <footer className="bg-primary text-white text-center py-3 mt-4 rounded-top">
        <p className="mb-0">&copy; 2025 Produk Inovatif. Hak Cipta Dilindungi Undang-Undang.</p>
    </footer>
);

// --- Komponen Utama Aplikasi (App) ---
function App() {
    const [registrationMessage, setRegistrationMessage] = useState('');

    const smoothScrollTo = useCallback((targetId, message = null) => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (message) {
                setRegistrationMessage(message);
                setTimeout(() => { setRegistrationMessage(''); }, 5000);
            }
        }
    }, []);

    const handleBuyClick = useCallback((e, productName) => {
        e.preventDefault();
        smoothScrollTo('#registrationSection', `Anda perlu mendaftar untuk membeli ${productName}. Silakan isi formulir di bawah ini!`);
    }, [smoothScrollTo]);

    const handleScrollToRegisterHero = useCallback((e) => {
        e.preventDefault();
        smoothScrollTo('#registrationSection');
    }, [smoothScrollTo]);

    return (
        <div>
            <AppHeader />
            <div className="container">
                <HeroSection onScrollToRegister={handleScrollToRegisterHero} />
                <ProductSection onBuyClick={handleBuyClick} />
                <LoanCalculator />
                <RegistrationForm message={registrationMessage} />
            </div>
            <AppFooter />
        </div>
    );
}

// Mengekspor komponen App sebagai default agar bisa diimpor oleh index.js
export default App;