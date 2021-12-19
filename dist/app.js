class SkillView {
    skill

    skillItem;
    skillItemBox;
    skillTitle;
    skillName;
    skillRatio;
    progressbar;
    progressbarStrip;
    skillsButton;

    constructor(skill) {
        this.skill = skill;

        this.skillItem = document.createElement("section");
        this.skillItem.id = this.skill.id + this.skill.name;

        this.skillItemBox = document.createElement("div");
        this.skillTitle = document.createElement("div");
        this.skillName = document.createElement("div");
        this.skillRatio = document.createElement("div");
        this.progressbar = document.createElement("div");
        this.progressbarStrip = document.createElement("div");
        this.skillsButton = document.createElement("div");

        this.skillItem.classList.add("skills-item");
        this.skillItemBox.classList.add("skills-item-inner");
        this.skillTitle.classList.add("skill-item-title");
        this.progressbar.classList.add("progress-bar");
        this.skillsButton.classList.add("__delete-image");
        this.progressbarStrip.classList.add("progress-bar-load");

        this.skillRatio.id = this.skill.id + this.skill.name + "skill-percent";
        this.progressbarStrip.id = this.skill.id + this.skill.name + "progress-bar-load";
        this.skillsButton.id = this.skill.id;

        this.skillName.innerText = skill.name;
        this.skillRatio.innerText = skill.ratio + "%";
        this.progressbarStrip.style.width = this.skillRatio.innerText;

        this.skillItem.appendChild(this.skillItemBox);
        this.skillItem.appendChild(this.skillsButton);
        this.skillItemBox.appendChild(this.skillTitle);
        this.skillTitle.appendChild(this.skillName);
        this.skillTitle.appendChild(this.skillRatio);
        this.skillItemBox.appendChild(this.progressbar);
        this.progressbar.appendChild(this.progressbarStrip);

        this.skillsButton.addEventListener("click", () => skillsHandler.deleteSkill(this.skillsButton));
    }

    rewriteSkill(newRatio) {
        this.skill.ratio = newRatio;
        this.skillRatio = document.getElementById(this.skill.id + this.skill.name + "skill-percent");
        this.progressbarStrip = document.getElementById(this.skill.id + this.skill.name + "progress-bar-load");
        this.skillRatio.innerText = newRatio + "%";
        this.progressbarStrip.style.width = this.skillRatio.innerText;
    }
}

class SkillsHandler {
    skills;
    arrayOfViewsSkill;
    presentationSkills;

    constructor() {
        this.skills = [new Skill("Be late with deadlines", 99, "1")];
        this.arrayOfViewsSkill = [];
        this.presentationSkills = document.querySelector(".skills-list");
        for (let i = 0; i < this.skills.length; i++) {
            this.arrayOfViewsSkill.push(new SkillView(this.skills[i]));
            this.presentationSkills.appendChild(this.arrayOfViewsSkill[i].skillItem);
        }
    }

    addNewSkillItem(skill) {
        for (let i = 0; i < this.skills.length; ++i) {
            if (this.skills[i].name === skill.name) {
                if (this.skills[i].ratio === skill.ratio) {
                    return;
                }
                if (this.skills[i].ratio !== skill.ratio) {
                    this.skills[i].ratio = skill.ratio;
                    this.arrayOfViewsSkill[i].rewriteSkill(this.skills[i].ratio);
                    return;
                }
            }
        }
        if (this.skills.length >= 4) {
            alert("Too much skills");
            return;
        }
        skill.id = this.skills.length;
        this.skills.push(skill);
        this.arrayOfViewsSkill.push(new SkillView(skill));
        this.presentationSkills.appendChild(this.arrayOfViewsSkill[this.skills.length - 1].skillItem);
    }

    deleteSkill(node) {
        this.skills.splice(node.id);
        this.arrayOfViewsSkill.splice(node.id);
        node.parentNode.remove();
    }
}

class Skill {
    constructor(name, ratio, id) {
        this.name = name;
        this.ratio = ratio;
        this.id = id;
    }
}

const form = document.forms[0];
const [first, second] = form.getElementsByClassName("skill__input");
const addition = document.querySelector(".skill-insertion_swim");
skillsHandler = new SkillsHandler();

form.addEventListener("submit", function (event) {
    event.preventDefault();
    skillsHandler.addNewSkillItem(new Skill(first.value, second.value));
    form.reset();
    addition.classList.add("__hidden");
});

document.addEventListener("DOMContentLoader", movePage);

document.getElementById("add-new-skill").addEventListener("click", () => addition.classList.toggle("__hidden"));

function movePage() {
    document.location = location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === "index.html"
        ? "skills.html" : "index.html";
}
