const BITS_PER_BYTE = 8

export const LSD = {
  sort(a, w) {
    const n = a.length,
          R = 256

    for(let d = w - 1; d >= 0; d--) {
      const aux = [],
            counter = []

      counter[0] = 0

      for(let i = 0; i < n; i++) {
        let index = a[i].charCodeAt(d) + 1
        if(!counter[index]) counter[index] = 1
        else counter[index]++
      }

      for(let i = 0; i < R; i++) {
        if(!counter[i]) counter[i] = 0
        if(!counter[i + 1]) counter[i + 1] = 0
        counter[i + 1] += counter[i]
      }

      for(let i = 0; i < n; i++)
        aux[counter[a[i].charCodeAt(d)]++] = a[i]

      for(let i = 0; i < n; i++)
        a[i] = aux[i]
    }
  }
}

export const MSD = {
  sort() {

  }
}
