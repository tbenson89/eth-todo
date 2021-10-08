App = {
    load: async () => {
        // Load App..
        console.log("App Loading...");
    }
}


$(() => {
    $(window).load(() => {
        App.load();
    })
})