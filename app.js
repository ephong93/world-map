const timeline = anime.timeline();

timeline
    .add({
        targets: '.r1',
        duration: 1500,
        height: [0, 458],
        y: [430, 0]
    })
    .add({
        targets: '.r2',
        duration: 1500,
        height: [0, 448],
        y: [430, 5]
    }, '-=1500')
    .add({
        targets: '.e1',
        duration: 1500,
        ry: [30, 50]
    }, '-=1500')
    .add({
        targets: '.e2',
        duration: 1500,
        ry: [10, 30.5]
    }, '-=1500')
    .add({
        targets: '.e2',
        duration: 1500,
        fill: ['#0000FF', '#FF0000'],
        easing: 'linear'
    }, '-=1500')
    .add({
        targets: '.degree-bar',
        duration: 1500,
        height: [20, 300],
        y: [400, 100],
        fill: ['#0000FF', '#FF0000'],
        easing: 'linear'
    }, '-=1500');

const thermometer = document.querySelector('#thermometer');

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //timeline.play();
        const divEl = document.createElement('div');
        divEl.innerHTML = xhr.responseText;
        divEl.id = 'world-map';
        document.querySelector('section').appendChild(divEl);

        for (let path of divEl.querySelectorAll('path')) {
            path.addEventListener('mouseover', (e) => {
                e.target.style.fill = 'red';
                const rect = e.target.getBoundingClientRect();
                thermometer.style.top = rect.top + 'px';
                thermometer.style.left = rect.right + 'px';
                timeline.restart();
            });
            path.addEventListener('mouseleave', (e) => {
                e.target.style.fill = '#ececec';
            })
        }

    }
};
xhr.open('GET', 'world.svg');
xhr.send();
