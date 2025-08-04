<template>
  <div
    class="juego-naves"
    @mousemove="moverNave"
    @click="disparar"
    @touchmove.prevent="moverNaveTouch"
  >
    <!-- Nave del jugador -->
    <div class="nave" :style="{ left: posicionNave + 'px' }"></div>

    <!-- Disparos del jugador -->
    <div
      class="disparo"
      v-for="(disparo, index) in disparos"
      :key="'d' + index"
      :style="{ top: disparo.y + 'px', left: disparo.x + 'px' }"
    ></div>

    <!-- Disparos enemigos -->
    <div
      class="disparo-enemigo"
      v-for="(disparoE, index) in disparosEnemigos"
      :key="'de' + index"
      :style="{ top: disparoE.y + 'px', left: disparoE.x + 'px' }"
    ></div>

    <!-- Enemigos normales -->
    <div
      class="enemigo"
      v-for="(enemigo, index) in enemigos"
      :key="'e' + index"
      :style="{ top: enemigo.y + 'px', left: enemigo.x + 'px' }"
    ></div>

    <!-- Jefe final -->
    <div
      v-if="jefe"
      class="jefe"
      :style="{ top: jefe.y + 'px', left: jefe.x + 'px' }"
    >
      <div class="vida-jefe" v-for="n in jefe.vidas" :key="n"></div>
    </div>

    <!-- Vidas visuales -->
    <div class="vidas">
      <span v-for="n in vidas" :key="n" class="corazon">❤️</span>
    </div>

    <!-- Puntuación visible -->
    <div class="puntuacion">
      Puntuación: {{ puntuacion }} / {{ limitePuntuacion }}
    </div>

    <!-- Mensajes -->
    <div v-if="mensajeInicio" class="mensaje-inicio">{{ mensajeInicio }}</div>
    <div v-if="mensajeFinal" class="mensaje-final">{{ mensajeFinal }}</div>

    <!-- Botón para salir -->
    <button class="boton-salir" @click="$emit('salir')">Salir del juego</button>
  </div>
</template>

<script>
export default {
  name: "JuegoNaves",
  data() {
    return {
      posicionNave: 200, // Posición horizontal actual de la nave del jugador
      disparos: [], // Disparos del jugador
      disparosEnemigos: [], // Disparos de enemigos y jefe
      enemigos: [], // Enemigos normales
      jefe: null, // Jefe final

      intervaloEnemigos: null, // Intervalo para crear enemigos
      intervaloDisparos: null, // Intervalo para actualizar juego
      intervaloJefeDisparos: null, // Intervalo disparos jefe
      intervaloDisparoAutoTouch: null, // Intervalo disparos automáticos en touch

      puntuacion: 0, // Puntuación actual
      limitePuntuacion: 15, // Puntuación para jefe

      mensajeFinal: "", // Mensaje al finalizar
      mensajeInicio: "Comienza el juego en 3...", // Cuenta regresiva

      juegoTerminado: false, // Control para bloquear juego
      bloqueado: true, // Bloquea acciones (cuenta regresiva)
      vidas: 3, // Vidas jugador

      sonidoDisparo: null,
      sonidoExplosion: null,
    };
  },

  mounted() {
    // Escuchar tecla espacio para disparar
    window.addEventListener("keydown", this.teclaPresionada);

    // Cargar sonidos
    this.sonidoDisparo = new Audio(
      "https://actions.google.com/sounds/v1/laser/laser_1.mp3"
    );
    this.sonidoExplosion = new Audio(
      "https://actions.google.com/sounds/v1/explosions/explosion_01.mp3"
    );
    this.sonidoDisparo.load();
    this.sonidoExplosion.load();

    // Iniciar cuenta regresiva
    this.iniciarCuentaRegresiva();
  },

  beforeUnmount() {
    // Limpiar listeners e intervalos
    window.removeEventListener("keydown", this.teclaPresionada);
    clearInterval(this.intervaloEnemigos);
    clearInterval(this.intervaloDisparos);
    clearInterval(this.intervaloJefeDisparos);
    clearInterval(this.intervaloDisparoAutoTouch);
  },

  methods: {
    // Maneja tecla presionada: dispara con espacio
    teclaPresionada(e) {
      if (this.bloqueado) return;
      if (e.code === "Space") {
        this.disparar();
      }
    },

    // Cuenta regresiva antes de iniciar juego
    iniciarCuentaRegresiva() {
      let contador = 3;
      this.mensajeInicio = `Comienza el juego en ${contador}...`;
      this.bloqueado = true;

      const cuenta = setInterval(() => {
        contador--;
        if (contador > 0) {
          this.mensajeInicio = `Comienza el juego en ${contador}...`;
        } else {
          clearInterval(cuenta);
          this.mensajeInicio = "¡Comienza!";
          setTimeout(() => {
            this.mensajeInicio = "";
            this.bloqueado = false;
            this.iniciarJuego();
          }, 1000);
        }
      }, 1000);
    },

    // Inicia la lógica principal del juego
    iniciarJuego() {
      // Crear enemigos cada 1.5s mientras no haya jefe
      this.intervaloEnemigos = setInterval(() => {
        if (!this.bloqueado && !this.jefe) {
          const x = Math.random() * (window.innerWidth - 40);
          this.enemigos.push({
            x,
            y: 0,
            velocidadX: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1),
          });
        }
      }, 1500);

      // Actualizar posiciones cada 30ms
      this.intervaloDisparos = setInterval(() => {
        if (!this.bloqueado) {
          this.moverDisparos();
          this.moverDisparosEnemigos();
          this.moverEnemigos();
          this.detectarColisiones();
          this.enemigosDisparar();

          // Activar jefe si puntuacion limite
          if (this.puntuacion >= this.limitePuntuacion && !this.jefe) {
            this.crearJefe();
          }
        }
      }, 30);

      // Si es dispositivo táctil, activar disparo automático
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        this.intervaloDisparoAutoTouch = setInterval(() => {
          if (!this.bloqueado) {
            this.disparar();
          }
        }, 400); // Dispara cada 400ms automáticamente
      }
    },

    // Mueve nave con mouse (desktop)
    moverNave(evento) {
      if (this.bloqueado) return;
      this.posicionNave = Math.min(
        Math.max(evento.clientX - 25, 0),
        window.innerWidth - 50
      );
    },

    // Mueve nave con dedo (touch)
    moverNaveTouch(evento) {
      if (this.bloqueado) return;
      const touch = evento.touches[0];
      if (!touch) return;
      this.posicionNave = Math.min(
        Math.max(touch.clientX - 25, 0),
        window.innerWidth - 50
      );
    },

    // Disparo jugador
    disparar() {
      if (this.bloqueado) return;
      this.disparos.push({
        x: this.posicionNave + 20,
        y: window.innerHeight - 80,
      });
      if (this.sonidoDisparo) {
        this.sonidoDisparo.currentTime = 0;
        this.sonidoDisparo.play();
      }
    },

    // Mueve disparos jugador hacia arriba y filtra los que salen
    moverDisparos() {
      this.disparos = this.disparos
        .map((d) => ({ ...d, y: d.y - 7 }))
        .filter((d) => d.y > 0);
    },

    // Mueve disparos enemigos según vector velocidad y filtra fuera de pantalla
    moverDisparosEnemigos() {
      this.disparosEnemigos = this.disparosEnemigos
        .map((d) => ({ ...d, x: d.x + d.vx, y: d.y + d.vy }))
        .filter(
          (d) => d.y < window.innerHeight && d.x > 0 && d.x < window.innerWidth
        );
    },

    // Mueve enemigos normales hacia abajo y horizontalmente con rebotes
    moverEnemigos() {
      this.enemigos = this.enemigos
        .map((e) => {
          let nuevoX = e.x + e.velocidadX;
          let nuevoY = e.y + 4;

          if (nuevoX < 0) {
            nuevoX = 0;
            e.velocidadX *= -1;
          }
          if (nuevoX > window.innerWidth - 40) {
            nuevoX = window.innerWidth - 40;
            e.velocidadX *= -1;
          }

          return { ...e, x: nuevoX, y: nuevoY };
        })
        .filter((e) => e.y < window.innerHeight);
    },

    // Enemigos normales disparan hacia abajo con baja probabilidad
    enemigosDisparar() {
      this.enemigos.forEach((enemigo) => {
        if (Math.random() < 0.005) {
          this.disparosEnemigos.push({
            x: enemigo.x + 20,
            y: enemigo.y + 40,
            vx: 0,
            vy: 6,
          });
        }
      });
    },

    // Crear jefe final y configurar comportamiento
    crearJefe() {
      this.jefe = {
        x: window.innerWidth / 2 - 50,
        y: 50,
        vidas: 10,
        velocidadX: 3,
        direccion: 1,
      };
      clearInterval(this.intervaloEnemigos);

      // Disparos rápido jefe
      this.intervaloJefeDisparos = setInterval(() => {
        if (!this.bloqueado && this.jefe) {
          this.dispararJefe();
        }
      }, 400);

      // Movimiento continuo suave jefe
      this.moverJefeContinuo();
    },

    // Mover jefe con rebotes en bordes
    moverJefe() {
      if (!this.jefe) return;
      let nuevoX = this.jefe.x + this.jefe.velocidadX * this.jefe.direccion;
      if (nuevoX < 0 || nuevoX > window.innerWidth - 100) {
        this.jefe.direccion *= -1;
        nuevoX = this.jefe.x + this.jefe.velocidadX * this.jefe.direccion;
      }
      this.jefe.x = nuevoX;
    },

    // Animación continua movimiento jefe
    moverJefeContinuo() {
      if (this.juegoTerminado) return;
      this.moverJefe();
      requestAnimationFrame(this.moverJefeContinuo);
    },

    // Jefe dispara hacia la nave del jugador
    dispararJefe() {
      if (!this.jefe) return;

      const jefeX = this.jefe.x + 50;
      const jefeY = this.jefe.y + 40;

      const naveX = this.posicionNave + 25;
      const naveY = window.innerHeight - 45;

      // Vector dirección normalizado
      let dx = naveX - jefeX;
      let dy = naveY - jefeY;
      const distancia = Math.sqrt(dx * dx + dy * dy);
      dx /= distancia;
      dy /= distancia;

      const velocidadDisparo = 10;

      // Agrega disparo enemigo con vector velocidad
      this.disparosEnemigos.push({
        x: jefeX,
        y: jefeY,
        vx: dx * velocidadDisparo,
        vy: dy * velocidadDisparo,
      });

      if (this.sonidoDisparo) {
        this.sonidoDisparo.currentTime = 0;
        this.sonidoDisparo.play();
      }
    },

    // Detecta colisiones entre disparos, enemigos, jefe y nave
    detectarColisiones() {
      if (this.juegoTerminado) return;

      let enemigosAEliminar = [];
      let disparosAEliminar = [];
      let disparosEnemigosAEliminar = [];

      // Disparos jugador vs enemigos normales
      this.disparos.forEach((disparo, i) => {
        this.enemigos.forEach((enemigo, j) => {
          const dx = enemigo.x - disparo.x;
          const dy = enemigo.y - disparo.y;
          if (Math.abs(dx) < 30 && Math.abs(dy) < 30) {
            enemigosAEliminar.push(j);
            disparosAEliminar.push(i);
            this.puntuacion++;

            if (this.sonidoExplosion) {
              this.sonidoExplosion.currentTime = 0;
              this.sonidoExplosion.play();
            }
          }
        });
      });

      // Disparos jugador vs jefe
      if (this.jefe) {
        this.disparos.forEach((disparo, i) => {
          const dx = this.jefe.x + 50 - disparo.x;
          const dy = this.jefe.y + 40 - disparo.y;
          if (Math.abs(dx) < 60 && Math.abs(dy) < 60) {
            disparosAEliminar.push(i);
            this.jefe.vidas--;

            if (this.sonidoExplosion) {
              this.sonidoExplosion.currentTime = 0;
              this.sonidoExplosion.play();
            }

            if (this.jefe.vidas <= 0) {
              this.terminarJuego("¡Felicidades, derrotaste al jefe!");
            }
          }
        });
      }

      // Disparos enemigos vs nave jugador
      this.disparosEnemigos.forEach((disparoE, i) => {
        const dx = disparoE.x - (this.posicionNave + 25);
        const dy = disparoE.y - (window.innerHeight - 45);
        if (Math.abs(dx) < 25 && Math.abs(dy) < 40) {
          disparosEnemigosAEliminar.push(i);
          this.vidas--;

          if (this.sonidoExplosion) {
            this.sonidoExplosion.currentTime = 0;
            this.sonidoExplosion.play();
          }

          if (this.vidas <= 0) {
            this.terminarJuego("¡Has perdido! Intenta de nuevo.");
          }
        }
      });

      // Eliminar enemigos alcanzados
      enemigosAEliminar
        .sort((a, b) => b - a)
        .forEach((index) => this.enemigos.splice(index, 1));

      // Eliminar disparos jugador alcanzados
      disparosAEliminar
        .sort((a, b) => b - a)
        .forEach((index) => this.disparos.splice(index, 1));

      // Eliminar disparos enemigos alcanzados
      disparosEnemigosAEliminar
        .sort((a, b) => b - a)
        .forEach((index) => this.disparosEnemigos.splice(index, 1));
    },

    // Finaliza el juego y muestra mensaje
    terminarJuego(mensaje) {
      this.juegoTerminado = true;
      this.mensajeFinal = mensaje;
      this.bloqueado = true;
      clearInterval(this.intervaloEnemigos);
      clearInterval(this.intervaloDisparos);
      clearInterval(this.intervaloJefeDisparos);
      clearInterval(this.intervaloDisparoAutoTouch);

      // Cierra el juego tras 3.5 segundos
      setTimeout(() => {
        this.$emit("salir");
      }, 3500);
    },
  },
};
</script>

<style scoped>
.juego-naves {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 10;
  overflow: hidden;
  cursor: crosshair;
}
.juego-naves.bloqueado {
  cursor: default;
  pointer-events: none;
}
.juego-naves.bloqueado .boton-salir {
  pointer-events: auto;
}
.nave {
  position: absolute;
  bottom: 20px;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #ff0055, #ff66aa);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  box-shadow: 0 0 15px #ff6699;
  transform: rotate(-10deg);
  pointer-events: none;
}
.disparo {
  position: absolute;
  width: 5px;
  height: 20px;
  background: yellow;
  border-radius: 2px;
}
.disparo-enemigo {
  position: absolute;
  width: 5px;
  height: 20px;
  background: red;
  border-radius: 2px;
}
.enemigo {
  position: absolute;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle at center, #0066ff, #0033aa);
  border-radius: 20% 80% 20% 80%;
  box-shadow: 0 0 10px #3399ff;
  transform: rotate(15deg);
}
.jefe {
  position: absolute;
  width: 100px;
  height: 80px;
  background: radial-gradient(circle at center, #cc0000, #660000);
  border-radius: 50% 50% 20% 20% / 60% 60% 40% 40%;
  box-shadow: 0 0 25px #ff3333;
  transform: rotate(-5deg);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5px;
  user-select: none;
}
.vida-jefe {
  width: 8px;
  height: 8px;
  background: #ff4444;
  border-radius: 50%;
  margin: 0 2px;
  box-shadow: 0 0 4px #ff6666;
}
.boton-salir {
  position: fixed;
  top: 10px;
  right: 10px;
  background: #ff3366;
  color: white;
  border: none;
  padding: 8px 12px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  z-index: 20;
  user-select: none;
}
.boton-salir:hover {
  background: #ff1a4d;
}
.puntuacion {
  position: fixed;
  top: 10px;
  left: 10px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 3px black;
  z-index: 20;
}
.vidas {
  position: fixed;
  top: 40px;
  left: 10px;
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 3px black;
  z-index: 20;
}
.mensaje-inicio,
.mensaje-final {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 20px 40px;
  font-size: 28px;
  font-weight: bold;
  border-radius: 10px;
  z-index: 30;
  user-select: none;
}
.mensaje-final {
  font-size: 24px;
}
</style>
