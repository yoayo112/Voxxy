/**
 * Idk I needed someplace to do pitch processing so my files didnt get too messy.
 * @author Sky Vercauteren 
*/

import { heightRange } from '../UI/styles';
import { Profile } from '../profile';
import Sound from 'react-native-sound';

export class Pitch {
    public note!: string;
    public frequency!: number;
    public file!: string;
    public sound!: Sound;

    constructor(note: string, frequency: number, file:string) {
        this.note = note;
        this.frequency = frequency;
        this.file = file;
        const sound = this.load();
        sound.setVolume(1);
    }
    
    public load():Sound {
      const s = new Sound(this.file, Sound.MAIN_BUNDLE, (error: any) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
      });
      return s;
    }

    public release = () => {
      if (this.sound) {
        this.sound.release();
      }
    }

    // Modified play() method with retry logic
    public play(retryCount: number = 0) {
      let max = 5;
      let delay = 1000;
      if (!this.sound) {
          console.log(`needed to reload ${this.note}`);
          this.sound = this.load();
      }
      
      if (this.sound) {
        this.sound.play((success) => {
          console.log(`[Attempt ${retryCount + 1}] trying to play ${this.note}`);
          
          if (success) {
            console.log(`-- played successfully --`);
            this.sound?.setCurrentTime(0); // Reset for next play
          } else {
            console.warn(`[Attempt ${retryCount + 1}] couldn't play (probably encoding).`);
            this.sound?.setCurrentTime(0);
            
            if (retryCount < max) {
              setTimeout(() => {
                this.play(retryCount + 1); 
              }, delay);
            } else {
              console.error(`Failed to play ${this.note} after ${max + 1} attempts. Giving up.`);
            }
          }
        });
      } else {
          // This happens if load() failed and set this.sound = null
          console.error(`Fatal Error: Cannot play ${this.note}. Sound failed to initialize.`);
      }
    }
} 
export class Pitches {

  // C2 Octave
  public static readonly C2 = new Pitch("C2", 65.41, "c2.mp3");
  public static readonly Cs2 = new Pitch("C#2", 69.30, "cs2.mp3");
  public static readonly Db2 = new Pitch("Db2", 69.30, "cs2.mp3");
  public static readonly D2 = new Pitch("D2", 73.42, "d2.mp3");
  public static readonly Ds2 = new Pitch("D#2", 77.78, "ds2.mp3");
  public static readonly Eb2 = new Pitch("Eb2", 77.78, "ds2.mp3");
  public static readonly E2 = new Pitch("E2", 82.41, "e2.mp3");
  public static readonly F2 = new Pitch("F2", 87.31,"f2.mp3");
  public static readonly Fs2 = new Pitch("F#2", 92.50, "fs2.mp3");
  public static readonly Gb2 = new Pitch("Gb2", 92.50, "fs2.mp3");
  public static readonly G2 = new Pitch("G2", 98.00, "g2.mp3");
  public static readonly Gs2 = new Pitch("G#2", 103.83, "gs2.mp3");
  public static readonly Ab2 = new Pitch("Ab2", 103.83, "gs2.mp3");
  public static readonly A2 = new Pitch("A2", 110.00, "a2.mp3");
  public static readonly As2 = new Pitch("A#2", 116.54, "as2.mp3");
  public static readonly Bb2 = new Pitch("Bb2", 116.54, "as2.mp3");
  public static readonly B2 = new Pitch("B2", 123.47, "b2.mp3");

  // C3 Octave
  public static readonly C3 = new Pitch("C3", 130.81, "c3.mp3");
  public static readonly Cs3 = new Pitch("C#3", 138.59, "cs3.mp3");
  public static readonly Db3 = new Pitch("Db3", 138.59, "cs3.mp3");
  public static readonly D3 = new Pitch("D3", 146.83, "d3.mp3");
  public static readonly Ds3 = new Pitch("D#3", 155.56, "ds3.mp3");
  public static readonly Eb3 = new Pitch("Eb3", 155.56, "ds3.mp3");
  public static readonly E3 = new Pitch("E3", 164.81, "e3.mp3");
  public static readonly F3 = new Pitch("F3", 174.61, "f3.mp3");
  public static readonly Fs3 = new Pitch("F#3", 185.00, "fs3.mp3");
  public static readonly Gb3 = new Pitch("Gb3", 185.00, "fs3.mp3");
  public static readonly G3 = new Pitch("G3", 196.00, "g3.mp3");
  public static readonly Gs3 = new Pitch("G#3", 207.65, "gs3.mp3");
  public static readonly Ab3 = new Pitch("Ab3", 207.65, "gs3.mp3");
  public static readonly A3 = new Pitch("A3", 220.00, "a3.mp3");
  public static readonly As3 = new Pitch("A#3", 233.08, "as3.mp3");
  public static readonly Bb3 = new Pitch("Bb3", 233.08, "as3.mp3");
  public static readonly B3 = new Pitch("B3", 246.94, "b3.mp3");

  // C4 Octave (Middle C)
  public static readonly C4 = new Pitch("C4", 261.63, "c4.mp3");
  public static readonly Cs4 = new Pitch("C#4", 277.18, "cs4.mp3");
  public static readonly Db4 = new Pitch("Db4", 277.18, "cs4.mp3");
  public static readonly D4 = new Pitch("D4", 293.66, "d4.mp3");
  public static readonly Ds4 = new Pitch("D#4", 311.13, "ds4.mp3");
  public static readonly Eb4 = new Pitch("Eb4", 311.13, "ds4.mp3");
  public static readonly E4 = new Pitch("E4", 329.63, "e4.mp3");
  public static readonly F4 = new Pitch("F4", 349.23,"f4.mp3");
  public static readonly Fs4 = new Pitch("F#4", 369.99, "fs4.mp3");
  public static readonly Gb4 = new Pitch("Gb4", 369.99, "gs4.mp3");
  public static readonly G4 = new Pitch("G4", 392.00, "g4.mp3");
  public static readonly Gs4 = new Pitch("G#4", 415.30, "gs4.mp3");
  public static readonly Ab4 = new Pitch("Ab4", 415.30, "gs4.mp3");
  public static readonly A4 = new Pitch("A4", 440.00, "a4.mp3");
  public static readonly As4 = new Pitch("A#4", 466.16, "as4.mp3");
  public static readonly Bb4 = new Pitch("Bb4", 466.16, "as4.mp3");
  public static readonly B4 = new Pitch("B4", 493.88, "b4.mp3");

  // C5 Octave
  public static readonly C5 = new Pitch("C5", 523.25, "c5.mp3");
  public static readonly Cs5 = new Pitch("C#5", 554.37, "cs5.mp3");
  public static readonly Db5 = new Pitch("Db5", 554.37, "cs5.mp3");
  public static readonly D5 = new Pitch("D5", 587.3, "d5.mp3");
  public static readonly Ds5 = new Pitch("D#5", 622.25, "ds5.mp3");
  public static readonly Eb5 = new Pitch("Eb5", 622.25, "ds5.mp3");
  public static readonly E5 = new Pitch("E5", 659.25, "e5.mp3");
  public static readonly F5 = new Pitch("F5", 698.46, "f5.mp3");
  public static readonly Fs5 = new Pitch("F#5", 739.99, "fs5.mp3");
  public static readonly Gb5 = new Pitch("Gb5", 739.99, "fs5.mp3");
  public static readonly G5 = new Pitch("G5", 783.99, "g5.mp3");
  public static readonly Gs5 = new Pitch("G#5", 830.61, "gs5.mp3");
  public static readonly Ab5 = new Pitch("Ab5", 830.61, "gs5.mp3");
  public static readonly A5 = new Pitch("A5", 880.00, "a5.mp3");
  public static readonly As5 = new Pitch("A#5", 932.33, "as5.mp3");
  public static readonly Bb5 = new Pitch("Bb5", 932.33, "as5.mp3");
  public static readonly B5 = new Pitch("B5", 987.77, "b5.mp3");

  // C6 Octave
  public static readonly C6 = new Pitch("C6", 1046.50, "c6.mp3");

  public static allPitches: Pitch[] = [
    Pitches.C2,
    Pitches.Cs2,
    Pitches.Db2,
    Pitches.D2 ,
    Pitches.Ds2,
    Pitches.Eb2,
    Pitches.E2 ,
    Pitches.F2 ,
    Pitches.Fs2,
    Pitches.Gb2,
    Pitches.G2 ,
    Pitches.Gs2,
    Pitches.Ab2,
    Pitches.A2 ,
    Pitches.As2,
    Pitches.Bb2,
    Pitches.B2 ,
    Pitches.C3 ,
    Pitches.Cs3,
    Pitches.Db3,
    Pitches.D3 ,
    Pitches.Ds3,
    Pitches.Eb3,
    Pitches.E3 ,
    Pitches.F3 ,
    Pitches.Fs3,
    Pitches.Gb3,
    Pitches.G3 ,
    Pitches.Gs3,
    Pitches.Ab3,
    Pitches.A3 ,
    Pitches.As3,
    Pitches.Bb3,
    Pitches.B3 ,
    // C4 Octave (Middle C)
    Pitches.C4 ,
    Pitches.Cs4,
    Pitches.Db4,
    Pitches.D4 ,
    Pitches.Ds4,
    Pitches.Eb4,
    Pitches.E4 ,
    Pitches.F4 ,
    Pitches.Fs4,
    Pitches.Gb4,
    Pitches.G4 ,
    Pitches.Gs4,
    Pitches.Ab4,
    Pitches.A4 ,
    Pitches.As4,
    Pitches.Bb4,
    Pitches.B4 ,
    Pitches.C5 ,
    Pitches.Cs5,
    Pitches.Db5,
    Pitches.D5 ,
    Pitches.Ds5,
    Pitches.Eb5,
    Pitches.E5 ,
    Pitches.F5 ,
    Pitches.Fs5,
    Pitches.Gb5,
    Pitches.G5 ,
    Pitches.Gs5,
    Pitches.Ab5,
    Pitches.A5 ,
    Pitches.As5,
    Pitches.Bb5,
    Pitches.B5 ,
    Pitches.C6 ,
  ];

  // Prevent instantiation for this utility class (optional but recommended)
  private constructor() {}

  public static loadAll(){
    this.allPitches.forEach((p: Pitch, i: number) => {
      p.load();
    });
  }

  public static releaseAll(){
    this.allPitches.forEach((p: Pitch, i: number) => {
      p.release();
    });
  }

  public static increment(me: Pitch){
    let target = Pitches.C4;
    let natural = (!me.file.includes('s'))? true : false;

    let length = Pitches.allPitches.length;
    for(let i =0; i<length;  i++)
    {
      let check = Pitches.allPitches[i];
      if(check.note == me.note){
        let index = (!natural)? i+2 : i+1;
        index = (index>=length)? length-1: index;
        target =  Pitches.allPitches[index];
        }
    }
    return target;
  }

  public static decrement(me: Pitch){
    let target = Pitches.C4;
    let natural = (!me.file.includes('s'))? true : false;

    let length = Pitches.allPitches.length;
    for(let i =0; i<length;  i++)
    {
      let check = Pitches.allPitches[i];
      if(check.note == me.note){
        let index = (!natural)? i-2 : i-1;
        index = (index<=0)? 0: index;
        target =  Pitches.allPitches[index];
        }
    }
    return target;
  }


  public static noteToPitch(name: string)
  {
    let pitch = Pitches.C4;
    for(let i =0; i< Pitches.allPitches.length; i++)
    {
      if(Pitches.allPitches[i].note == name){
        pitch =  Pitches.allPitches[i];
      }
    }
    return pitch;
  }
  

  private static minFreq: number = 65.40639;   // Deep C (C2)
  private static maxFreq: number = 1046.502;   // C6

  public static async setRange(){
    let user = new Profile();
    await user.RetreiveProfile();

    this.minFreq = user.low_range.frequency;
    this.maxFreq = user.high_range.frequency;
  }

  // used to translate frequency to position. 
  //The box is 500px tall.
  //vocal range from c6(1046.502) to c2 (65.40639)
  public static fqzToPosition(freq: number){
    this.setRange();

    const scaleMax = heightRange;

    // Clamp input to valid range
    const clampedFreq = Math.min(Math.max(freq, Pitches.minFreq), Pitches.maxFreq);

    // Normalize and scale
    const normalized = (clampedFreq - Pitches.minFreq) / (Pitches.maxFreq - Pitches.minFreq);
    const mappedValue = Math.round(normalized * scaleMax);

    //TODO -- Make linear. 

    return mappedValue;
  }
}