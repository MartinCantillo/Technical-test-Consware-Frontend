import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';

import { Vehicle } from '../../Models/Vehicle';
import { VehicleService } from '../../Services/vehicle.service';

import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    CommonModule,
    InputNumberModule,
   
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HomeComponent {
  vehicleList: Vehicle[] = [];
  selectedVehicle: Vehicle = this.createEmptyVehicle();
  displayDialog: boolean = false;
  isEdit: boolean = false;
  newVehicle !: Vehicle ;
  constructor(
    private vehicleService: VehicleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadVehicles();
  }

  createEmptyVehicle(): Vehicle {
    return { id: 0, brand: '', model: '', year: new Date().getFullYear(), color: '' };
  }

  loadVehicles() {
    this.vehicleService.getAll().subscribe({
      next: (data) => (this.vehicleList = data),
      error: (err) => this.showError(err)
    });
  }

  showAddDialog() {
    this.isEdit = false;
    this.selectedVehicle = this.createEmptyVehicle();
    this.displayDialog = true;
  }
  

  showEditDialog(vehicle: Vehicle) {
    this.isEdit = true;
    this.selectedVehicle = { ...vehicle };
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  isFormValid(): boolean {
    const v = this.selectedVehicle;
    return v.brand.trim() !== '' && v.model.trim() !== '' && v.year > 1900 && v.color.trim() !== '';
  }

  saveVehicle() {
    if (!this.isFormValid()) {
      this.messageService.add({ severity: 'warn', summary: 'Formulario inválido', detail: 'Complete todos los campos correctamente.' });
      return;
    }

    if (this.isEdit) {
      this.vehicleService.update(this.selectedVehicle.id, this.selectedVehicle).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Vehículo actualizado correctamente.' });
          this.loadVehicles();
          this.displayDialog = false;
        },
        error: (err) => this.showError(err)
      });
    } else {
      this.vehicleService.create(this.selectedVehicle).subscribe({
        next: (newVehicle) => {
          this.messageService.add({ severity: 'success', summary: 'Agregado', detail: 'Vehículo agregado correctamente.' });
          this.vehicleList.push(newVehicle);
          this.displayDialog = false;
        },
        error: (err) => this.showError(err)
      });
    }
  }

  showDeleteDialog(vehicle: Vehicle) {
    this.confirmationService.confirm({
      message: `¿Está seguro que desea eliminar el vehículo ${vehicle.brand} ${vehicle.model}?`,
      accept: () => this.deleteVehicle(vehicle.id)
    });
  }

  deleteVehicle(id: number) {
    this.vehicleService.delete(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Vehículo eliminado correctamente.' });
        this.loadVehicles();
      },
      error: (err) => this.showError(err)
    });
  }

  showError(err: any) {
    console.error('Error:', err);
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error en la operación.' });
  }
}
