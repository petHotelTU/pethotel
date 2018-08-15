import { ReservationViewModel } from './reservation-view-model';
import { PetViewModel } from './pet-view-model';

export class ExtendedReservationViewModel extends ReservationViewModel {
	petDetails: PetViewModel; // have to contains all pet data that is attached for current reservation (filled by details dialog)
}
