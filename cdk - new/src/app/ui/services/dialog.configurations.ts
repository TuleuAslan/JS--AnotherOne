export interface IAlertConfig {
    title: string;
    content: string;
    close?: () => void;
}

export interface IConfirmConfig {
    title?: string;
    content?: string;
    cancelText?: string;
    confirmText?: string;
    close?: (result?: boolean) => void;
}
