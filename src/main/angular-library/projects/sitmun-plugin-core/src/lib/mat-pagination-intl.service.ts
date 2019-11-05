import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

/** Material design table pagination service */
@Injectable()
export class MatPaginationIntlService extends MatPaginatorIntl {
  /** translate service */
  translate: TranslateService;
  /** first page label */
  firstPageLabel = 'First page';
  /** items page label */
  itemsPerPageLabel = 'Items per page';
  /** last page label */
  lastPageLabel = 'Last page';
  /** next page label */
  nextPageLabel = 'Next page';
  /** previous page label */
  previousPageLabel = 'Previous page';

  /** get range label given page, page size and length */
  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const of = this.translate ? this.translate.instant('mat-paginator-intl.of') : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = ((page * pageSize) > length) ?
      (Math.ceil(length / pageSize) - 1) * pageSize:
      page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  /** inject translate service */
  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  /** translate labels */
  translateLabels() {
    this.firstPageLabel = this.translate.instant('mat-paginator-intl.first_page');
    this.itemsPerPageLabel = this.translate.instant('mat-paginator-intl.items_per_page');
    this.lastPageLabel = this.translate.instant('mat-paginator-intl.last_page');
    this.nextPageLabel = this.translate.instant('mat-paginator-intl.next_page');
    this.previousPageLabel = this.translate.instant('mat-paginator-intl.previous_page');
  }
}