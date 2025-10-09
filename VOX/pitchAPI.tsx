/**
 * Idk I needed someplace to do pitch processing so my files didnt get too messy.
 * @author Sky Vercauteren 
*/

import React , {useState, useEffect} from 'react';
import { pitchBoxHeight, heightRange } from './UI/styles';
import { Profile } from './profile';

export var minFreq: number = 65.40639;   // Deep C (C2)
export var maxFreq: number = 1046.502;   // C6

export function setRange ()
{
  minFreq = pitchFrequencies[Profile.low_range];
  maxFreq = pitchFrequencies[Profile.high_range];

}

// used to translate frequency to position. 
//The box is 500px tall.
//vocal range from c6(1046.502) to c2 (65.40639)
export function fqzToPosition(freq: number)
{
  const scaleMax = heightRange;

  // Clamp input to valid range
  const clampedFreq = Math.min(Math.max(freq, minFreq), maxFreq);

  // Normalize and scale
  const normalized = (clampedFreq - minFreq) / (maxFreq - minFreq);
  const mappedValue = Math.round(normalized * scaleMax);

  //TODO -- Make linear. 

  return mappedValue;
}

export const pitchFrequencies: Record<string, number> = {
  "C2": 65.41,
  "C#2": 69.30,
  "Db2": 69.30,
  "D2": 73.42,
  "D#2": 77.78,
  "Eb2": 77.78,
  "E2": 82.41,
  "F2": 87.31,
  "F#2": 92.50,
  "Gb2": 92.50,
  "G2": 98.00,
  "G#2": 103.83,
  "Ab2": 103.83,
  "A2": 110.00,
  "A#2": 116.54,
  "Bb2": 116.54,
  "B2": 123.47,

  "C3": 130.81,
  "C#3": 138.59,
  "Db3": 138.59,
  "D3": 146.83,
  "D#3": 155.56,
  "Eb3": 155.56,
  "E3": 164.81,
  "F3": 174.61,
  "F#3": 185.00,
  "Gb3": 185.00,
  "G3": 196.00,
  "G#3": 207.65,
  "Ab3": 207.65,
  "A3": 220.00,
  "A#3": 233.08,
  "Bb3": 233.08,
  "B3": 246.94,

  "C4": 261.63,
  "C#4": 277.18,
  "Db4": 277.18,
  "D4": 293.66,
  "D#4": 311.13,
  "Eb4": 311.13,
  "E4": 329.63,
  "F4": 349.23,
  "F#4": 369.99,
  "Gb4": 369.99,
  "G4": 392.00,
  "G#4": 415.30,
  "Ab4": 415.30,
  "A4": 440.00,
  "A#4": 466.16,
  "Bb4": 466.16,
  "B4": 493.88,

  "C5": 523.25,
  "C#5": 554.37,
  "Db5": 554.37,
  "D5": 587.33,
  "D#5": 622.25,
  "Eb5": 622.25,
  "E5": 659.25,
  "F5": 698.46,
  "F#5": 739.99,
  "Gb5": 739.99,
  "G5": 783.99,
  "G#5": 830.61,
  "Ab5": 830.61,
  "A5": 880.00,
  "A#5": 932.33,
  "Bb5": 932.33,
  "B5": 987.77,

  "C6": 1046.50
};
