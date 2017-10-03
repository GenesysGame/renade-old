// Rize RP. GGame Studio. 1.10.2017
// Animations list view controller

let animations = [
    { name: "amb@code_human_cower@male@enter", pr: "enter" },
    { name: "amb@code_human_cower@male@base", pr: "base" },
    { name: "amb@code_human_cower@male@exit", pr: "exit" },
    { name: "amb@code_human_cower@male@exit", pr: "exit_flee" },
    { name: "amb@code_human_cower@male@idle_a", pr: "idle_a" },
    { name: "amb@code_human_cower@male@idle_a", pr: "idle_b" },
    { name: "amb@code_human_cower@male@idle_a", pr: "idle_c" },
    { name: "amb@code_human_cower@male@idle_b", pr: "idle_d" },
    { name: "stop", pr: '' }
];

let list = $('.list');

animations.forEach(function (v, i) {
    list.append($('<option>', {
        value: i,
        text: v.name + " " + v.pr
    }));
});

list.on('change', function (e) {
    let optionSelected = $("option:selected", this);
    let index = optionSelected.val();
    let anim = animations[index];
    mp.trigger('animlist:animationSelected', anim.name, anim.pr);
});