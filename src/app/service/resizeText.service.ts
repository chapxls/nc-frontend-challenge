import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TextFitService {
  fitTextToElement(element: HTMLElement) {
    if (!element?.parentElement) {
      return
    }

    const { clientWidth: containerWidth, clientHeight: containerHeight } =
      element.parentElement

    let minFontSize = 10
    let maxFontSize = containerWidth

    while (minFontSize <= maxFontSize) {
      const fontSize = Math.floor((minFontSize + maxFontSize) / 2)
      element.style.fontSize = `${fontSize}px`

      if (
        element.scrollWidth <= containerWidth &&
        element.scrollHeight <= containerHeight
      ) {
        minFontSize = fontSize + 1
      } else {
        maxFontSize = fontSize - 1
      }
    }

    element.style.fontSize = `${maxFontSize}px`
  }
}
