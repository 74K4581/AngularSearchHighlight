import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, keyword: string): string {

    if (!keyword) return value;

    keyword = keyword
      // 正規表現のメタ文字をエスケープ    
      .replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&')
      // 半角スペースを OR に変換
      .replace(/ /g, "|");
    
    keyword = "(<[^>]+?>)|(" + keyword + ")|(&[^;]+?;)";
    var regExp = new RegExp(keyword, "g")

    return value.replace(
      regExp,
      (match:string, p1:string, p2:string, p3:string, offset:number, string:string) => {
        if (p1) return match;
        if (p3) return match;
        if (p2) return `<span class="highlight">${p2}</span>`;
        return match;
      });
  }

}
