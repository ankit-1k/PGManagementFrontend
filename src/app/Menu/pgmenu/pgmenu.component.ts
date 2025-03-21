import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/Menu/menu.service';

@Component({
  selector: 'app-pgmenu',
  templateUrl: './pgmenu.component.html',
  styleUrls: ['./pgmenu.component.scss']
})
export class PgmenuComponent implements OnInit {
  weeklyMenu: any[] = [];
  menuDialog: boolean = false;
  isEdit: boolean = false;
  menuForm: FormGroup;
  selectedMenuId: string | null = null;
  day = [
    { label: 'Sunday', value: 'Sunday' },
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' }
  ];

  constructor(private menuService: MenuService, private fb: FormBuilder) {
    this.menuForm = this.fb.group({
      day: ['', Validators.required],
      breakfast: ['', Validators.required],
      lunch: ['', Validators.required],
      dinner: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchMenu();
  }

  // Fetch menu data from backend
  fetchMenu(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => (this.weeklyMenu = data),
      error: () => {
        alert('Error fetching menu data');
      }
    });
  }

  openMenuDialog(menu: any = null): void {
    this.isEdit = !!menu;
    this.menuDialog = false; // Close dialog first to refresh UI
    setTimeout(() => {
      this.menuDialog = true;
      if (menu) {
        this.selectedMenuId = menu._id;
        this.menuForm.patchValue(menu);
      } else {
        this.selectedMenuId = null;
        this.menuForm.reset();
      }
    }, 10); // Delay opening to allow UI refresh
  }

  // Save menu (Add or Update)
  saveMenu(): void {
    if (this.menuForm.invalid) return;

    if (this.isEdit && this.selectedMenuId) {
      this.menuService.updateMenu(this.selectedMenuId, this.menuForm.value).subscribe({
        next: () => {
          this.fetchMenu();
          this.menuDialog = false;
        },
        error: () => {
          alert('Error updating menu');
        }
      });
    } else {
      this.menuService.addMenu(this.menuForm.value).subscribe({
        next: () => {
          this.fetchMenu();
          this.menuDialog = false;
        },
        error: () => {
          alert('Error adding menu');
        }
      });
    }
  }

  // Delete menu item
  deleteMenu(menuId: string): void {
    this.menuService.deleteMenu(menuId).subscribe({
      next: () => this.fetchMenu(),
      error: () => alert('Error deleting menu')
    });
  }

  // Close modal
  closeMenuDialog(): void {
    this.menuDialog = false;
  }
}
