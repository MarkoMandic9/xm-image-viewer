import { Component, ChangeDetectionStrategy, input, output, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-no-elements-panel',
  templateUrl: './no-elements-panel.component.html',
  imports: [MatCardModule, MatIconModule],
  styleUrls: ['./no-elements-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoElemensPanelComponent {
  @Input() message: string = 'No items found.';
  @Input() icon: string = 'list';
}
