<script>
    export let translations = [];
    export let locale = 'en';

    $: selectedTranslation = translations?.find(t => t.locale === locale);
</script>



    {#if selectedTranslation}
        <h3>Translation ({locale}):</h3>
        <p>{selectedTranslation}</p>
        {JSON.stringify(selectedTranslation)}
    {/if}