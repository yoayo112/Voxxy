/**
 * Idk I needed someplace to do pitch processing so my files didnt get too messy.
 * @author Sky Vercauteren 
*/

import React , {useState, useEffect} from 'react';
import { pitchBoxHeight } from './styles';

// used to translate frequency to position. 
//The box is 500px tall.
//vocal range from c6(1046.502) to c2 (65.40639)
export function fqzToPosition(freq: number)
{
  const minFreq = 65.40639;   // Deep C (C2)
  const maxFreq = 1046.502;   // C6
  const scaleMax = pitchBoxHeight-10;

  // Clamp input to valid range
  const clampedFreq = Math.min(Math.max(freq, minFreq), maxFreq);

  // Normalize and scale
  const normalized = (clampedFreq - minFreq) / (maxFreq - minFreq);
  const mappedValue = Math.round(normalized * scaleMax);

  return mappedValue;
}