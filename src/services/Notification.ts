/**
 * @author Nikola Popov
 * @description
 * global notification , create element and push to success or error wrap
 */

class GlobalNot{
    msg: string
    type: string
    secund: number

    constructor (private message: string, type: string) {
        this.msg = message
        this.type = type
        this.secund = 4000
        this.appendInWpap(this.createElements())
    }

    createElements(){
        const div = document.createElement('div');
        (this.type === 'error') ? div.className = 'floating-notice floating-notice--error' : div.classList.add('floating-notice')
        const span = document.createElement('span')
        span.classList.add('floating-notice__text')
        span.innerHTML = this.msg;
        (this.type === 'error')
            ? div.innerHTML = '<svg class="not-icon" data-v-654a5806="" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-icon="times" data-prefix="fal" viewBox="0 0 320 512" fill="currentColor" class="svg-inline--fa fa-times fa-w-10 fa-2x"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>'
            : div.innerHTML = '<svg class="not-icon" data-v-654a5806="" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-icon="check" data-prefix="fal" viewBox="0 0 448 512" fill="currentColor" class="svg-inline--fa fa-check fa-w-14 fa-2x"><path d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>'
        
        div.appendChild(span)
        return div
    }

    appendInWpap(div): void{
        const wrap = document.getElementById('globalMsg')
        wrap.appendChild(div)
        this.removeFromWrap(div)
    }

    removeFromWrap(div): void{
        setTimeout(() => {
            div.remove()
        }, this.secund)
    }

} 

export default GlobalNot