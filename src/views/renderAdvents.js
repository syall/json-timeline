import { advents, tags } from './advents.js';

const adventDomGroups = advents
    .map(group =>
        group.map(advent => ({
            advent,
            adventDiv: renderAdvent(advent)
        }))
    )
    .map(group => ({
        group,
        groupDom: renderAdventGroup(group)
    }));

function renderAdvent(advent) {
    const adventDiv = document.createElement('div');
    adventDiv.classList.add('advent');

    const titleP = document.createElement('p');
    titleP.classList.add('title');
    titleP.classList.add('mono-text');
    titleP.innerText = advent.title;
    adventDiv.appendChild(titleP);

    const dateP = document.createElement('p');
    dateP.classList.add('date');
    dateP.classList.add('mono-text');
    dateP.innerText = (
        `${advent.start.month}/${advent.start.day}/${advent.start.year}` +
        ((advent.end === null)
            ? ''
            : `-${advent.end.month}/${advent.end.day}/${advent.end.year}`)
    );
    adventDiv.appendChild(dateP);

    const tagsP = document.createElement('p');
    tagsP.classList.add('tags');
    tagsP.classList.add('mono-text');
    tagsP.innerText = `Tags:${advent.tags.join(',')}`;
    adventDiv.appendChild(tagsP);

    const contentP = document.createElement('p');
    contentP.classList.add('content');
    contentP.classList.add('read-text');
    contentP.innerText = advent.content;
    adventDiv.appendChild(contentP);

    return adventDiv;
}

function renderAdventGroup(group) {

    const groupDiv = document.createElement('div');
    groupDiv.classList.add('group');

    const dateToggleP = document.createElement('p');
    dateToggleP.classList.add('group-date');
    dateToggleP.classList.add('mono-text');
    dateToggleP.addEventListener('click', toggleVisibility());
    const { advent: { start: { month, day, year } } } = group[0];
    const date = `${month}/${day}/${year}`;
    dateToggleP.innerText = `${date} [▼]`;
    groupDiv.appendChild(dateToggleP);

    const adventsDiv = document.createElement('div');
    adventsDiv.classList.add('advents');
    adventsDiv.classList.add('hidden');
    groupDiv.appendChild(adventsDiv);

    return groupDiv;
}

export function renderTagToggles(target1, target2) {

    const toggleTitle = document.createElement('p');
    toggleTitle.classList.add('toggle-container-title');
    toggleTitle.classList.add('mono-text');
    toggleTitle.innerText = 'Tags [▼]';
    toggleTitle.addEventListener('click', toggleVisibility());

    target1.appendChild(toggleTitle);

    const toggleContainer = document.createElement('div');
    toggleContainer.classList.add('toggles-container');
    toggleContainer.classList.add('hidden');
    target1.appendChild(toggleContainer);

    for (const key of tags.keys()) {
        const tagToggleDiv = document.createElement('div');
        tagToggleDiv.classList.add('toggle-container');

        const tagToggleCheck = document.createElement('input');
        tagToggleCheck.setAttribute('type', 'checkbox');
        tagToggleCheck.setAttribute('checked', true);
        tagToggleCheck.classList.add('tag-toggle');
        tagToggleCheck.addEventListener('click', () => {
            tags.set(key, !tags.get(key));
            renderTimeline(target2);
        });
        tagToggleDiv.appendChild(tagToggleCheck);

        const tagToggleLabel = document.createElement('label');
        tagToggleLabel.classList.add('tag-toggle-label');
        tagToggleLabel.classList.add('mono-text');
        tagToggleLabel.innerText = key;
        tagToggleDiv.appendChild(tagToggleLabel);

        toggleContainer.appendChild(tagToggleDiv);
    }
}

function toggleVisibility(findFn = target => target.nextElementSibling) {
    return function ({ target }) {
        const container = findFn(target);
        const end = target.innerText.length - 3;

        // Hide
        if (target.innerText.endsWith('[▼]')) {
            container.classList.remove('hidden');
            target.innerText = `${target.innerText.slice(0, end)}[▲]`;
        }
        // Show
        else {
            container.classList.add('hidden');
            target.innerText = `${target.innerText.slice(0, end)}[▼]`;
        }
    };
}

export function renderTimeline(target) {
    removeChildren(target);
    for (const { group, groupDom } of adventDomGroups) {
        const [_, advents] = groupDom.children;
        removeChildren(advents);
        for (const { advent, adventDiv } of group) {
            if (advent.tags.some(tag => tags.get(tag))) {
                advents.appendChild(adventDiv);
            }
        }
        if (advents.firstChild) {
            target.appendChild(groupDom);
        }
    }
}

function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

