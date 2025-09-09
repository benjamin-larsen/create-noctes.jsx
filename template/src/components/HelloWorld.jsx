import { ref } from 'noctes.jsx'

export default {
    onCreated() {
        this.count = ref(0)
    },

    render(props) {
        return (
            <>
                <div>{ props.msg }</div>
                <div class='card'>
                    <button type='button' onclick={() => this.count.value++}>count is {this.count.value}</button>
                </div>
            </>
        )
    }
}