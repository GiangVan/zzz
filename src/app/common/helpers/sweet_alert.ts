import Swal, { SweetAlertOptions } from 'sweetalert2';

export class SwtAlert{
	static display(options: SweetAlertOptions){
		if(!options.hasOwnProperty('reverseButtons')){
			options['reverseButtons'] = true;
		};
		if(!options.hasOwnProperty('focusConfirm')){
			options['focusConfirm'] = false;
		};
		return Swal.fire(options);
	}
}