import React, { useState } from 'react';

const Jogo = () => {
  const [numeroAlvo] = useState(Math.floor(Math.random() * 100) + 1);
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const palpiteUsuario = parseInt(palpite);

    if (isNaN(palpiteUsuario)) {
      setMensagem('Por favor, digite um número válido');
      return;
    }

    if (palpiteUsuario < 1 || palpiteUsuario > 100) {
      setMensagem('Por favor, digite um número entre 1 e 100');
      return;
    }

    setTentativas((prev) => prev + 1);

    if (palpiteUsuario === numeroAlvo) {
      setMensagem(
        `Parabéns! Você acertou em ${tentativas + 1} tentativa${
          tentativas >= 9 ? '(!)' : ''
        }`
      );
      setJogoFinalizado(true);
    } else if (palpiteUsuario < numeroAlvo) {
      setMensagem('O número é mais ALTO!');
    } else {
      setMensagem('O número é mais BAIXO!');
    }

    setPalpite('');
  };

  const reiniciarJogo = () => {
    window.location.reload();
  };

  return (
    <div className="container-jogo">
      <h1>Adivinhe o Número!</h1>
      <p>Digite um número entre 1 e 100:</p>

      {!jogoFinalizado ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={palpite}
            onChange={(e) => setPalpite(e.target.value)}
            placeholder="Digite seu palpite"
          />
          <button type="submit">Enviar</button>
        </form>
      ) : (
        <button onClick={reiniciarJogo}>Jogar Novamente</button>
      )}

      {mensagem && (
        <div className="mensagem">
          {mensagem.includes('Parabéns') ? (
            <>
              <p>🎉</p>
              <p>{mensagem}</p>
            </>
          ) : (
            <p>{mensagem}</p>
          )}
        </div>
      )}

      <p>Tentativas: {tentativas}</p>
      <div className="separador"></div>
    </div>
  );
};

export default Jogo;
