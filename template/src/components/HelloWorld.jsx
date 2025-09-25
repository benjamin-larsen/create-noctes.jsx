import { ref } from 'noctes.jsx'

export default {
  onCreated(ctx) {
    ctx.count = ref(0)
  },

  render(ctx, props) {
    return (
      <>
        <div>{props.msg}</div>
        <div class='card'>
          <button type='button' onClick={() => ctx.count.value++}>count is ${ctx.count.value}</button>
        </div>
      </>
    )
  }
}