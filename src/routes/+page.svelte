<script>
  import {useCompletion} from 'ai/svelte'
  import Markdown from '@magidoc/plugin-svelte-marked'
  const {completion, complete} = useCompletion()

  let input = '다진마늘, 참기름, 홍고추, 생크림, 간장, 멸치다시마육수, 감자, 우유, 양파, 대파, 설탕, 통깨, 고추장, 청양고추, 고춧가루, 두부, 버터'
  let newItem = ''
  let mealType = ''
  let spicyPreference = 'X'
  let items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7', 'item 8', 'item 9', 'item 10']
  let step = 0
  function fetchAPI() {
    complete(`재료: ${input}\n식사 유형: ${mealType}\n매운 음식: ${spicyPreference}\n제외 음식:`)
    items = input.split(',').map(item => item.trim())
  }
  function addItem() {
    if (newItem.trim() !== '') {
      items = [...items, newItem.trim()]
      newItem = '' // Reset input field after adding
    }
  }
</script>

<p>재료를 입력하세요!</p>
<input bind:value={input} /> <button on:click={() => ++step}>다음</button>

{#if step > 0}
  <p>이 재료로 든든한 저녁식사용 요리를 만드실 계획이신가요, 아니면 간단한 아침식사용 요리 또는 술을 곁들일 안주나 밑반찬으로 생각하고 계신가요?</p>
  <input bind:value={mealType} />
  {#if input.includes('고추') || input.includes('고춧가루')}
    <button on:click={() => ++step}>다음</button>
  {:else}
    <button on:click={fetchAPI}>생성</button>
  {/if}
{/if}

{#if step == 2}
  <p>매운 것은 잘 먹나요?</p>
  <select id="spicyPreference" bind:value={spicyPreference}>
    <option value="O">O</option>
    <option value="X">X</option>
  </select>
  <button on:click={fetchAPI}>생성</button>
{/if}

<br />
<article class="prose max-w-none">
  <Markdown source={$completion} />
</article>

<div class="fixed right-5 top-1/2 w-96 -translate-y-1/2 transform rounded-xl bg-white shadow-md">
  <nav class="flex max-h-[80vh] min-w-[240px] flex-col gap-1 overflow-y-auto p-2 font-sans text-base font-normal text-blue-gray-700">
    {#each items as item}
      <div
        role="button"
        class="flex w-full items-center rounded-lg p-3 py-1 pl-4 pr-1 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        {item}
        <div class="ml-auto grid place-items-center justify-self-end">
          <button
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            on:click={() => (items = items.filter(i => i != item))}>
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
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
  <div class="mt-4 flex items-center justify-between p-2">
    <input class="mr-2 flex-1 rounded border p-2" type="text" bind:value={newItem} placeholder="Add new item..." />
    <button class="rounded border bg-blue-500 p-2 text-white" on:click={addItem}>Add</button>
    <button class="ml-2 rounded border bg-green-500 p-2 text-white" on:click={async () => await fetchAPI(items.join(', '))}>Completion</button>
  </div>
</div>
