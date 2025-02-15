import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { SafeUrl } from '@angular/platform-browser'
import { gql } from 'apollo-angular'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '../../../../environments/environment'
import { GetCollectionsQuery } from '../../../common/generated-types'
import { DataService } from '../../providers/data/data.service'
import { TOURS } from 'src/app/faker/tour'

@Component({
  selector: 'vsf-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  tours!: any
  collections$: Observable<GetCollectionsQuery['collections']['items']>
  constructor(private dataService: DataService) {}
  tour = TOURS[0]
  ngOnInit(): void {
    this.tours = TOURS
  }
  handleContactClick() {
    alert(`Bạn đã nhấn liên hệ với ${this.tour.name}`)
  }
}

const GET_COLLECTIONS = gql`
  query GetCollections($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        parent {
          id
          slug
          name
        }
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`
