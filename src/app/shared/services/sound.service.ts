import { Injectable } from '@angular/core';
import { Sound } from '../enums/sound.enum';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  play(soundKey: Sound): void {
    const audio = new Audio()
    audio.src = soundKey
    audio.load()
    audio.play().catch(err => console.error('Error al reproducir sonido:', err))
  }
}
