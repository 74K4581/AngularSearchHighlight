import { Pipe, PipeTransform } from '@angular/core';

// TODO: test に対する tes|est 検索は tes しかヒットしない
@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

    transform(value: string, keyword: string): string {

        if (!keyword) return value;

        // 正規表現のメタ文字をエスケープ    
        keyword = keyword
            .trim()
            .replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');

        // 半角スペースを"|"(OR)に変換
        // ""で囲っている部分は対象外
        keyword = keyword
            .replace(/("[^"]+?")|( +)/g,
                (match: string, p1: string, p2: string, offset: number, string: string) => {
                    if (p1) return p1.substr(1, p1.length - 2);
                    if (p2) return `|`;
                    return match;
                });

        keyword = keyword
            .replace(/&/g, "&amp;")
            .replace(/ /g, "&nbsp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")

        keyword = "(<[^>]+?>)|(" + keyword + ")|(&[^;]+?;)";
        var regExp = new RegExp(keyword, "g")

        return value.replace(
            regExp,
            (match: string, p1: string, p2: string, p3: string, offset: number, string: string) => {
                if (p1) return match; // HTMLタグ内は対象外
                if (p3) return match; // 
                if (p2) return `<span class="highlight">${p2}</span>`;
                return match;
            });
    }

}
