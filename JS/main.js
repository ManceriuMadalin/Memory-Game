let firstArr = document.getElementsByClassName('first')
let secondArr = document.getElementsByClassName('second')
let names = ["fa-pepper-hot", "fa-carrot", "fa-apple-whole",
     "fa-bacon", "fa-pizza-slice", "fa-crown",
     "fa-star", "fa-egg"]
let icons = []
let index = []
let numOfClick = 0
let corectAnswer = 0
let counter = 0

function restart() {
     document.querySelector('#timer').innerHTML = '0'
     document.querySelector('#restartBg').style.display = 'none'
     corectAnswer = 0
     counter = 0

     timer()

     shuffle(icons)

     for (let i = 0; i < firstArr.length; i++) {
          firstArr[i].appendChild(icons[i])
     }

     let i = 0
     firstArr[i].style.transform = 'rotateY(360deg)'
     secondArr[i].style.transform = 'rotateY(360deg)'
     secondArr[i].style.zIndex = '-1'

     setTimeout(() => {
          for (let i = 0; i < firstArr.length; i++) {
               firstArr[i].style.transform = 'rotateY(180deg)'
               secondArr[i].style.transform = 'rotateY(180deg)'
               secondArr[i].style.zIndex = '1'
          }

     }, 2000)

     setTimeout(() => {document.querySelector('#counter').classList.add('counter')}, 3000)
}

window.onload = () => {

     timer()

     for (let i = 0; i < firstArr.length; i++) {
          let icon = document.createElement('i')
          icon.style.position = 'absolute'
          icon.style.zIndex = '2'
          icon.classList.add('fa-solid', names[i % 8])
          icons.push(icon)
     }

     shuffle(icons)

     for (let i = 0; i < firstArr.length; i++) {
          firstArr[i].appendChild(icons[i])
     }

     setTimeout(() => {
          for (let i = 0; i < firstArr.length; i++) {
               firstArr[i].style.transform = 'rotateY(180deg)'
               secondArr[i].style.transform = 'rotateY(180deg)'
               secondArr[i].style.zIndex = '1'
          }
     }, 2000)

     setTimeout(() => {document.querySelector('#counter').classList.add('counter')}, 3000)
}

function verify(timer, corectAnswer, t) {
     if (corectAnswer === 8) {
          const status = timer <= 25 ? 'Ai o memorie foarte buna' : timer <= 45 ? 'Ai o memorie buna' : 'Nu prea ai tinere de minte'
          clearInterval(t)
          setTimeout(() => {
               document.getElementById('restartBg').style.display = 'block'
               document.getElementById('status').textContent = status 
          }, 1000)
          document.querySelector('#counter').classList.remove('counter')
     }
}

function timer() {
     let time = document.querySelector('#timer')
     setTimeout(() => {
          let t = setInterval(() => {
               time.innerHTML = `${counter}s`
               counter++
               verify(counter, corectAnswer, t)
          }, 1000)
     }, 2000)
}

function shuffle(array) {
     let currentIndex = array.length, randomIndex;

     while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [
               array[randomIndex], array[currentIndex]];
     }
}

function rotate(event) {
     if (event.target.className === 'second') {
          event.target.style.transform = 'rotateY(360deg)'
          event.target.style.zIndex = '-1'
          event.target.parentNode.firstElementChild.style.transform = 'rotateY(360deg)'
          for (let i = 0; i < secondArr.length; i++) {
               if (secondArr[i] === event.target) {
                    index.push(i)
                    numOfClick++
               }
          }
     }

     if (numOfClick === 2) {
          checkCards()
     }

     if ((!checkCards()) && (numOfClick === 2)) {
          rotateBack()
     }
}

function checkCards() {
     if (firstArr[index[0]].firstElementChild.classList['1'] ===
          firstArr[index[1]].firstElementChild.classList['1']) {
          index = []
          numOfClick = 0
          corectAnswer += 1
          return true
     } else {
          return false
     }

}

function rotateBack() {
     setTimeout(() => {
          for (let i = 0; i < 2; i++) {
               firstArr[index[i]].style.transform = 'rotateY(180deg)'
               secondArr[index[i]].style.transform = 'rotateY(180deg)'
               secondArr[index[i]].style.zIndex = '1'
          }

          index = []
          numOfClick = 0
     }, 1000)
}