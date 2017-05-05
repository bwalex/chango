export const reduced = t => t && t.hasOwnProperty('@@transducer/reduced')
export const step = (t, result, input) => t['@@transducer/step'](result, input)
export const result = (t, result) => t['@@transducer/result'](result)
