<script lang="ts">
    import type { State } from '$lib/interfaces/state';
	export let boardMatrix: State[][];
</script>

<p>
    {JSON.stringify(boardMatrix, null, 4)}
</p>

<h1>Minesweeper</h1>

<div class="flex flex-col items-center">
    {#each boardMatrix as row, i}
        <div class="flex flex-row">
            {#each row as square, j}
                <div id="square">{square.square == 1 ? "X" : "O"}</div>
            {/each}
        </div>
    {/each}
</div>