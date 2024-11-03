import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './models/employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeArray : Employee[]=[
    {id:1,name: "Juan", country:"Mexico"},
    {id:2,name: "Auron", country:"España"},
    {id:3,name: "Fargan", country:"España"},
  ];

  title = 'app';
  selectedEmployee = { id:0, name: '', country: '' };
  activeEmployeeId: number | null = null;

  addEditEmployee() {
    if (!this.selectedEmployee.name || !this.selectedEmployee.country) {
      alert('Por favor, complete todos los campos antes de continuar.');
      return;
    }
    if (this.activeEmployeeId==0) {
      const newID=this.employeeArray.length>0? this.employeeArray[this.employeeArray.length-1].id+1:1;
      const newEmployee = {newID, ...this.selectedEmployee};
      this.employeeArray.push(newEmployee);
    } else {
      const index = this.employeeArray.findIndex(emp => emp.id === this.selectedEmployee.id);
      this.employeeArray[index] = { ...this.selectedEmployee };
    }

    this.resetForm();

  }
  

  openForEdit(employee: any) {
    this.selectedEmployee = { ...employee };
    this.activeEmployeeId = employee.id;
  }

  resetForm() {
    this.selectedEmployee = { id:0, name: '', country: '' };
    this.activeEmployeeId = null;
  }

  deleteEmployee() {
    this.employeeArray = this.employeeArray.filter(emp => emp.id !== this.activeEmployeeId);
    this.resetForm();
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('table') && !targetElement.closest('form')) {
      this.resetForm();
    }
  }
}
