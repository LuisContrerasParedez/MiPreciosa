import { useState } from 'react';
import './App.css';

const frasesBonitas = [
  "¡No huyas, preciosa! 💘",
  "Yo se que quieres decir que sí 😍",
  "Tu sí me haces muy feliz 🥰",
  "No te arrepentiras 💫",
  "Vamos a ser felices juntos ❤️",
  "Mi Vida yo se que si quieres 💓"
];

function App() {
  const [step, setStep] = useState(0);
  const [showCarta, setShowCarta] = useState(false);

  const next = () => setStep(prev => prev + 1);
  const reset = () => {
    setStep(0);
    setShowCarta(false);
  };

  const corazones = Array.from({ length: 25 }).map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const size = Math.random() * 20 + 20;
    return (
      <div
        key={i}
        className="heart"
        style={{
          left: `${left}%`,
          animationDelay: `${delay}s`,
          fontSize: `${size}px`
        }}
      >
        ❤️
      </div>
    );
  });

  const confetti = Array.from({ length: 50 }).map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 1.5;
    return (
      <div
        key={i}
        style={{
          left: `${left}%`,
          backgroundColor: i % 2 === 0 ? '#ff4081' : '#f8bbd0',
          animationDelay: `${delay}s`
        }}
      ></div>
    );
  });

  const renderContent = () => {
    if (showCarta) return <Carta onVolver={reset} />;

    switch (step) {
      case 0:
        return <Frase texto="Sin duda alguna eres la casualidad mas bonita que me pudo pasar en la vida 💖" onNext={next} />;
      case 1:
        return <Frase texto="Me siento tan bien estando contigo 💖" onNext={next} />;
      case 2:
        return <Frase texto="Eres el mejor regalo que Diosito me pudo dar 🎁, por eso mismo quiero hacerte la siguiente pregunta" onNext={next} />;
      case 3:
        return <Frase texto="¿Me prestas 1000 quetzales? 😅 Te imaginas? jajaja bromita, sigamos..." onNext={next} />;
      case 4:
        return <Pregunta onSi={() => setStep(7)} onNo={() => setStep(5)} />;
      case 5:
        return <EstasSegura onSi={() => setStep(6)} onNo={() => setStep(7)} />;
      case 6:
        return <FinalNo onCarta={() => setShowCarta(true)} onVolver={reset} />;
      case 7:
        return <FinalSi onCarta={() => setShowCarta(true)} onVolver={reset} />;
      default:
        return <h1>Te quiero ❤️</h1>;
    }
  };

  return (
    <>
      <div className="heart-bg">{corazones}</div>
      {step === 7 && <div className="confetti">{confetti}</div>}
      <div className="container">
        {renderContent()}
      </div>
    </>
  );
}

function Frase({ texto, onNext }) {
  return (
    <>
      <h1>{texto}</h1>
      <button onClick={onNext}>Continuar</button>
    </>
  );
}

function Pregunta({ onSi, onNo }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [mensaje, setMensaje] = useState("");

  const moverBoton = () => {
    const randX = Math.floor(Math.random() * 200) - 100;
    const randY = Math.floor(Math.random() * 100) - 50;
    setPos({ top: randY, left: randX });
    const randomFrase = frasesBonitas[Math.floor(Math.random() * frasesBonitas.length)];
    setMensaje(randomFrase);
  };

  return (
    <>
      <h1>¿Puedo ser tu novio? 💌</h1>
      <p className="mensaje">{mensaje}</p>
      <div className="buttons">
        <button onClick={onSi}>Sí 💘</button>
        <div style={{ position: "relative" }} onMouseEnter={moverBoton}>
          <button
            onClick={onNo}
            style={{
              position: "relative",
              top: `${pos.top}px`,
              left: `${pos.left}px`,
              transition: "top 0.3s, left 0.3s"
            }}
          >
            No 😢
          </button>
        </div>
      </div>
    </>
  );
}

function EstasSegura({ onSi, onNo }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [mensaje, setMensaje] = useState("");

  const moverBoton = () => {
    const randX = Math.floor(Math.random() * 200) - 100;
    const randY = Math.floor(Math.random() * 100) - 50;
    setPos({ top: randY, left: randX });
    const randomFrase = frasesBonitas[Math.floor(Math.random() * frasesBonitas.length)];
    setMensaje(randomFrase);
  };

  return (
    <>
      <h1>¿Estás segura preciosa? 🤔</h1>
      <p className="mensaje">{mensaje}</p>
      <div className="buttons">
        <div style={{ position: "relative" }} onMouseEnter={moverBoton}>
          <button
            onClick={onSi}
            style={{
              position: "relative",
              top: `${pos.top}px`,
              left: `${pos.left}px`,
              transition: "top 0.3s, left 0.3s"
            }}
          >
            Sí 😞
          </button>
        </div>
        <button onClick={onNo}>No 😅</button>
      </div>
    </>
  );
}

function FinalNo({ onCarta, onVolver }) {
  return (
    <>
      <h1>No acepto un no por respuesta 🙅‍♂️</h1>
      <p>Porque sé que en el fondo también me quieres 💖</p>
      <p>Te adoro mujer, me encantas demasiado <span style={{ fontSize: "1.4rem" }}>💗</span></p>
      <div className="buttons">
        <button onClick={onVolver}>Volver a vivir la magia ✨</button>
        <button onClick={onCarta}>Leer mi carta 💌</button>
      </div>
    </>
  );
}

function FinalSi({ onCarta, onVolver }) {
  return (
    <>
      <h1>¡Sabía que dirías que sí! 🥰</h1>
      <p>Prepárate para el inicio de nuestra historia más bonita 💞</p>
      <p>Ahora dame un beso 😘</p>
      <div className="buttons">
        <button onClick={onVolver}>Volver a vivir la magia ✨</button>
        <button onClick={onCarta}>Leer mi carta 💌</button>
      </div>
    </>
  );
}

function Carta({ onVolver }) {
  return (
    <>
      <h1>Una carta para ti 💖</h1>
      <p>
      Bueno pues Liza Gabriela si estas leyendo esta carta es porque me acabas de hacer el hombre más feliz del mundo, y quiero que sepas que eres una persona increíble, llena de luz y amor.
      No podria estar mas feliz de querer compartir mi vida contigo, eres una mujer maravillosa y estoy muy agradecido de tenerte a mi lado.
      </p>
      <p>
        Quiero seguir compartiendo momentos contigo, seguir conociéndote y seguir disfrutando de tu compañía.
        Me haces sentir tan bien, y quiero que sepas que siempre estaré aquí para ti.
        Espero que esta carta te haga sentir tan especial como tú me haces sentir a mí.
        Eres una persona increíble y estoy muy agradecido de tenerte en mi vida.
        Espero que podamos seguir creando recuerdos juntos y disfrutando de cada momento.
        Te quiero mucho y siempre estaré aquí para ti.

      </p>
      <p>Con todo mi cariño,</p>
      <p><strong>Tu novio 💘</strong></p>
      <div className="buttons">
        <button onClick={onVolver}>Volver a vivir la magia ✨</button>
      </div>
    </>
  );
}

export default App;
