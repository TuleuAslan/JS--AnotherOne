import {
    animate,
    keyframes,
    state,
    style,
    transition,
    trigger,
    group,
    sequence,
    animation,
} from '@angular/animations';

export const TODO_LIST_ITEM_ANIMATION_STATES = [
    state('default', style({})),
    state(
        'hovered',
        style({
            backgroundColor: '#333',
            color: '#fff',
            cursor: 'pointer',
        })
    ),
    state(
        'leaving',
        style({
            height: '0px',
        })
    ),
];

export const TODO_LIST_ITEM_ANIMATION_TRANSITIONS = [
    transition(
        'default => hovered',
        group([
            sequence([
                animate(1000, style({ backgroundColor: 'red' })),
                animate(1000, style({ backgroundColor: '#333' })),
            ]),
            animate(300, style({ color: '#fff' })),
        ])
    ),
    transition('hovered => default', animate('300ms')),
    transition('* => leaving', [
        animate('1000ms', style({ overflow: 'hidden', height: 0 })),
    ]),
    transition(':enter', [
        style({
            height: 0,
            overflow: 'hidden',
        }),
        animate(
            '1000ms',
            style({
                height: '*',
            })
        ),
    ]),
    transition(':leave', [
        animate(1000, style({ opacity: 0, overflow: 'hidden', height: 0 })),
    ]),
];

export const HOVER_ANIMATION = animation([
    animate(
        '{{ time }}',
        style({
            backgroundColor: '{{ hoverColor }}',
        })
    ),
]);

export const TODO_LIST_ITEM_TRIGGER = trigger('listItemHover', [
    ...TODO_LIST_ITEM_ANIMATION_STATES,
    ...TODO_LIST_ITEM_ANIMATION_TRANSITIONS,
]);
