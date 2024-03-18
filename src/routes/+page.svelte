<script>
  import Markdown from '@magidoc/plugin-svelte-marked'

  let input = ''
  let output = ''
  let newItem = ''
  let mealType = ''
  let spicyPreference = 'X'
  let items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7', 'item 8', 'item 9', 'item 10']
  let step = 0
  async function fetchAPI(text) {
    text = `재료: ${text}\n식사 유형: ${mealType}\n매운 음식: ${spicyPreference}\n제외 음식:`
    console.log(text)
    const response = await fetch('/api', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text})
    })
    if (response.ok) {
      const data = await response.json()
      output = data.output
      console.log(data)
    } else {
      console.error('Failed to get the completion from OpenAI')
    }
  }
  async function completion() {
    items = input.split(',').map(item => item.trim())
    fetchAPI(input)
  }
  function addItem() {
    if (newItem.trim() !== '') {
      items = [...items, newItem.trim()]
      newItem = '' // Reset input field after adding
    }
  }
</script>

<input bind:value={input} /> <button on:click={() => ++step}>다음</button>

{#if step > 0}
  <p>이 재료로 든든한 저녁식사용 요리를 만드실 계획이신가요, 아니면 간단한 아침식사용 요리 또는 술을 곁들일 안주나 밑반찬으로 생각하고 계신가요?</p>
  <input bind:value={mealType} />
  {#if input.includes('고추') || input.includes('고춧가루')}
    <button on:click={() => ++step}>다음</button>
  {:else}
    <button on:click={completion}>생성</button>
  {/if}
{/if}

{#if step == 2}
  <p>매운 것은 잘 먹나요?</p>
  <select id="spicyPreference" bind:value={spicyPreference}>
    <option value="O">O</option>
    <option value="X">X</option>
  </select>
  <button on:click={completion}>생성</button>
{/if}

<br />
{#if output}
  <article class="prose max-w-none">
    <Markdown source={output} />
  </article>
{/if}

<div class="fixed top-1/2 right-5 transform -translate-y-1/2 bg-white shadow-md rounded-xl w-96">
  <nav class="flex max-h-[80vh] overflow-y-auto min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
    {#each items as item}
      <div
        role="button"
        class="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        {item}
        <div class="grid ml-auto place-items-center justify-self-end">
          <button
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            on:click={() => (items = items.filter(i => i != item))}>
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path
                  fill-rule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clip-rule="evenodd"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    {/each}
  </nav>
  <div class="flex items-center justify-between mt-4 p-2">
    <input class="flex-1 p-2 mr-2 border rounded" type="text" bind:value={newItem} placeholder="Add new item..." />
    <button class="p-2 border rounded bg-blue-500 text-white" on:click={addItem}>Add</button>
    <button class="ml-2 p-2 border rounded bg-green-500 text-white" on:click={async () => await fetchAPI(items.join(', '))}>Completion</button>
  </div>
</div>
