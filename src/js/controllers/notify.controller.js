export class Notify {

    static toastify(message, title, className, srcImage) {
        const toast_container = document.createElement("div")
        const toast_info = document.createElement("div")
        const toast_title = document.createElement("strong")
        const toast_description = document.createElement("p")
        const toast_image = document.createElement("img")

        toast_title.innerText = title
        toast_description.innerText = message
        toast_image.src = srcImage

        toast_container.className = className

        toast_info.append(toast_title, toast_description)
        toast_container.append(toast_info, toast_image)

        return toast_container
    }

    static success(message) {
        const body = document.querySelector("body")

        const toast_success = Notify.toastify(message, "Success!", "toast container-success", "../../img/success.svg")

        body.append(toast_success)

        Notify.transition(".container-success")
    }

    static error(message) {
        const body = document.querySelector("body")

        const toast_error = Notify.toastify(message, "Error", "toast container-error", "../../img/error.svg")

        body.append(toast_error)

        Notify.transition(".container-error")
    }

    static transition(toast) {
        const toastify = document.querySelector(toast)

        toastify.animate([
            { transform: 'translateY(-300px)' },
            { transform: 'translateY(0px)' }
        ], {
            duration: 1000,
            iteration: 1
        })


        setTimeout(() => {
            toastify.animate([
                { transform: 'translateY(0px)' },
                { transform: 'translateY(-300px)' }
            ], {
                duration: 3000,
                iteration: 1
            }
            )
        }, 3000)

        setTimeout(() => {
            document.querySelector("body").removeChild(toastify)
        }, 6000)
    }
}