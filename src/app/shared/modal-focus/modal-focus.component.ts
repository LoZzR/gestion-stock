import { Component, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-modal-confirm-autofocus',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Confirmation</h4>
			<button
				type="button"
				class="btn-close"
				aria-label="Close button"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Voulez-vous vraiment quitter cette page ? vos changements seront perdus</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Non</button>
			<button type="button" ngbAutofocus class="btn btn-outline-success" (click)="modal.close('Ok click')">Oui</button>
		</div>
	`,
})
export class NgbdModalConfirmAutofocus {
	constructor(public modal: NgbActiveModal) {}
}

@Component({ selector: 'ngbd-modal-focus', templateUrl: './modal-focus.component.html' })
export class NgbdModalFocus {

	constructor(private _modalService: NgbModal) {}

	open() {
		this._modalService.open(NgbdModalConfirmAutofocus);
	}
}