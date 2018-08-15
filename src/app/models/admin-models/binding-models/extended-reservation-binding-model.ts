import { ReservationBaseModel } from '../base-models/reservation-base-model';
import { PetViewModel } from '../view-models/pet-view-model';

export class ExtendedReservationBindingModel extends ReservationBaseModel {
	petDetails: PetViewModel; // have to contains all pet data that is attached for current reservation (filled by details dialog)
}
