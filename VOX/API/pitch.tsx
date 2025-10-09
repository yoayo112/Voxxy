/**
 * Idk I needed someplace to do pitch processing so my files didnt get too messy.
 * @author Sky Vercauteren 
*/

import { heightRange } from '../UI/styles';
import { Profile } from '../profile';

export class Pitch {
    public note: string;
    public frequency: number;

    constructor(note: string, frequency: number) {
        this.note = note;
        this.frequency = frequency;
    }
}
export class Pitches {

  // C2 Octave
  public static readonly C2 = new Pitch("C2", 65.41);
  public static readonly Cs2 = new Pitch("C#2", 69.30);
  public static readonly Db2 = new Pitch("Db2", 69.30);
  public static readonly D2 = new Pitch("D2", 73.42);
  public static readonly Ds2 = new Pitch("D#2", 77.78);
  public static readonly Eb2 = new Pitch("Eb2", 77.78);
  public static readonly E2 = new Pitch("E2", 82.41);
  public static readonly F2 = new Pitch("F2", 87.31);
  public static readonly Fs2 = new Pitch("F#2", 92.50);
  public static readonly Gb2 = new Pitch("Gb2", 92.50);
  public static readonly G2 = new Pitch("G2", 98.00);
  public static readonly Gs2 = new Pitch("G#2", 103.83);
  public static readonly Ab2 = new Pitch("Ab2", 103.83);
  public static readonly A2 = new Pitch("A2", 110.00);
  public static readonly As2 = new Pitch("A#2", 116.54);
  public static readonly Bb2 = new Pitch("Bb2", 116.54);
  public static readonly B2 = new Pitch("B2", 123.47);

  // C3 Octave
  public static readonly C3 = new Pitch("C3", 130.81);
  public static readonly Cs3 = new Pitch("C#3", 138.59);
  public static readonly Db3 = new Pitch("Db3", 138.59);
  public static readonly D3 = new Pitch("D3", 146.83);
  public static readonly Ds3 = new Pitch("D#3", 155.56);
  public static readonly Eb3 = new Pitch("Eb3", 155.56);
  public static readonly E3 = new Pitch("E3", 164.81);
  public static readonly F3 = new Pitch("F3", 174.61);
  public static readonly Fs3 = new Pitch("F#3", 185.00);
  public static readonly Gb3 = new Pitch("Gb3", 185.00);
  public static readonly G3 = new Pitch("G3", 196.00);
  public static readonly Gs3 = new Pitch("G#3", 207.65);
  public static readonly Ab3 = new Pitch("Ab3", 207.65);
  public static readonly A3 = new Pitch("A3", 220.00);
  public static readonly As3 = new Pitch("A#3", 233.08);
  public static readonly Bb3 = new Pitch("Bb3", 233.08);
  public static readonly B3 = new Pitch("B3", 246.94);

  // C4 Octave (Middle C)
  public static readonly C4 = new Pitch("C4", 261.63);
  public static readonly Cs4 = new Pitch("C#4", 277.18);
  public static readonly Db4 = new Pitch("Db4", 277.18);
  public static readonly D4 = new Pitch("D4", 293.66);
  public static readonly Ds4 = new Pitch("D#4", 311.13);
  public static readonly Eb4 = new Pitch("Eb4", 311.13);
  public static readonly E4 = new Pitch("E4", 329.63);
  public static readonly F4 = new Pitch("F4", 349.23);
  public static readonly Fs4 = new Pitch("F#4", 369.99);
  public static readonly Gb4 = new Pitch("Gb4", 369.99);
  public static readonly G4 = new Pitch("G4", 392.00);
  public static readonly Gs4 = new Pitch("G#4", 415.30);
  public static readonly Ab4 = new Pitch("Ab4", 415.30);
  public static readonly A4 = new Pitch("A4", 440.00);
  public static readonly As4 = new Pitch("A#4", 466.16);
  public static readonly Bb4 = new Pitch("Bb4", 466.16);
  public static readonly B4 = new Pitch("B4", 493.88);

  // C5 Octave
  public static readonly C5 = new Pitch("C5", 523.25);
  public static readonly Cs5 = new Pitch("C#5", 554.37);
  public static readonly Db5 = new Pitch("Db5", 554.37);
  public static readonly D5 = new Pitch("D5", 587.33);
  public static readonly Ds5 = new Pitch("D#5", 622.25);
  public static readonly Eb5 = new Pitch("Eb5", 622.25);
  public static readonly E5 = new Pitch("E5", 659.25);
  public static readonly F5 = new Pitch("F5", 698.46);
  public static readonly Fs5 = new Pitch("F#5", 739.99);
  public static readonly Gb5 = new Pitch("Gb5", 739.99);
  public static readonly G5 = new Pitch("G5", 783.99);
  public static readonly Gs5 = new Pitch("G#5", 830.61);
  public static readonly Ab5 = new Pitch("Ab5", 830.61);
  public static readonly A5 = new Pitch("A5", 880.00);
  public static readonly As5 = new Pitch("A#5", 932.33);
  public static readonly Bb5 = new Pitch("Bb5", 932.33);
  public static readonly B5 = new Pitch("B5", 987.77);

  // C6 Octave
  public static readonly C6 = new Pitch("C6", 1046.50);

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
  

  private static minFreq: number = 65.40639;   // Deep C (C2)
  private static maxFreq: number = 1046.502;   // C6

  public static setRange(){
    let user = new Profile();
    user.RetreiveProfile();

    this.minFreq = user.low_range.frequency;
    this.maxFreq = user.high_range.frequency;
  }

  // used to translate frequency to position. 
  //The box is 500px tall.
  //vocal range from c6(1046.502) to c2 (65.40639)
  public static fqzToPosition(freq: number){
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